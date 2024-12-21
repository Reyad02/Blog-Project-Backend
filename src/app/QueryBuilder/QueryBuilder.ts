import { Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: search, $options: 'i' },
        })),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['search', 'sortBy', 'sortOrder'];
    excludeFields.forEach((element) => delete queryObj[element]);
    if (queryObj.filter) {
      this.modelQuery = this.modelQuery
        .find({ author: queryObj.filter })
        .populate('author');
    }
    return this;
  }

  sort() {
    const sortOrder = this?.query?.sortOrder || 'asc';
    let sortBy = this?.query?.sortBy || 'createdAt';
    if (sortOrder === 'desc') {
      sortBy = '-' + sortBy;
    }
    this.modelQuery = this.modelQuery.sort(sortBy as string);

    return this;
  }
}

export default QueryBuilder;
