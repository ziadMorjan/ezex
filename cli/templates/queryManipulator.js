exports.queryManipulatorTemplate = `export default class QueryManipulator {
    constructor(req, model) {
        this.req = req;
        this.model = model;
        this.query = model.find(); // Initialize query here
    }

    filter() {
        const queryObj = { ...this.req.query };
        const excludedFields = ['page', 'sort', 'limit', 'select', 'keyword'];
        excludedFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\\b(gte|gt|lte|lt)\\b/g, match => \`$\${match}\`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        if (this.req.query.sort) {
            const sortBy = this.req.query.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    selectFields() {
        if (this.req.query.select) {
            const fields = this.req.query.select.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }
    
    search() {
        if (this.req.query.keyword) {
            const keyword = this.req.query.keyword;
            this.query = this.query.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } }
                ]
            });
        }
        return this;
    }

    paginate() {
        const page = this.req.query.page * 1 || 1;
        const limit = this.req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}
`;
