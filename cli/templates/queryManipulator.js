// This template file defines the content for the QueryManipulator class,
// which helps in building Mongoose queries based on request parameters.

exports.queryManipulatorTemplate = `module.exports = class QueryManipulator {
        constructor(req, model) {
            this.req = req;
            this.model = model;
        }
    
        // Applies filtering based on query parameters.
        // Handles conversion of comparison operators (gte, gt, lte, lt) to MongoDB syntax ($gte, $gt, etc.).
        // Removes pagination, selection, sorting, and keyword search parameters from the filter object.
        filter() {
            let queryStr = JSON.stringify(this.req.query);
            // Replace operators like gte, gt, lte, lt with their MongoDB equivalents ($gte, $gt, etc.)
            // This regex ensures we only add "$" if it's not already there.
            queryStr = queryStr.replace(/\\b(gte|gt|lte|lt)\\b/g, match => \`$\${match}\`);
    
            let filterObj = JSON.parse(queryStr);
    
            // Define parameters that should NOT be part of the actual MongoDB filter query
            const excludedFields = ['select', 'sort', "keyword", "page", "limit"];
            
            // Delete excluded fields from the filter object
            excludedFields.forEach(prop => {
                delete filterObj[prop];
            });
    
            // Initialize the Mongoose query with the filtered object
            this.query = this.model.find(filterObj);
    
            return this; // Allow chaining
        }
    
        // Applies field selection to the query.
        // If 'select' parameter is provided, it selects specified fields.
        // Otherwise, it excludes the '__v' (version key) field by default.
        selectFields() {
            if (this.req.query.select) {
                let select = this.req.query.select.split(",").join(" ");
                this.query = this.query.select(select);
            } else {
                this.query = this.query.select("-__v"); // Exclude __v field by default
            }
            return this; // Allow chaining
        }
    
        // Applies sorting to the query.
        // If 'sort' parameter is provided, it sorts by specified fields.
        // Otherwise, it sorts by '-createdAt' (most recent first) by default.
        sort() {
            if (this.req.query.sort) {
                let sort = this.req.query.sort.split(",").join(" "); // Assuming sort fields are comma-separated
                this.query = this.query.sort(sort);
            } else {
                this.query = this.query.sort("-createdAt"); // Default sort by creation date descending
            }
            return this; // Allow chaining
        }
    
        // Applies search functionality based on a 'keyword' query parameter.
        // Searches 'name' and 'description' fields using case-insensitive regex.
        search() {
            if (this.req.query.keyword) {
                let filterObj = {};
                // Use $or for searching across multiple fields
                filterObj.$or = [
                    { name: { $regex: this.req.query.keyword, $options: "i" } }, // Case-insensitive search on 'name'
                    { description: { $regex: this.req.query.keyword, $options: "i" } } // Case-insensitive search on 'description'
                ];
                this.query = this.query.find(filterObj);
            }
            return this; // Allow chaining
        }
    
        // Applies pagination to the query.
        // Uses 'page' and 'limit' query parameters. Defaults to page 1 and no limit (Infinity).
        paginate() {
            let page = parseInt(this.req.query.page) || 1; // Parse page to integer, default to 1
            let limit = parseInt(this.req.query.limit) || Infinity; // Parse limit to integer, default to Infinity
            let skip = (page - 1) * limit; // Calculate documents to skip
    
            this.query = this.query.skip(skip).limit(limit);
            return this; // Allow chaining
        }
    }
    `;
