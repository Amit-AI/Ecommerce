class ApiFeatures {
    constructor(dbModel, queryStr) {
        this.model = dbModel;
        this.queryStr = queryStr;
        this.result = null;
    }

    search() {
        let searchObj = {};

        //name search
        if (this.queryStr.name) {
            searchObj = {
                ...searchObj,
                name: { $regex: this.queryStr.name, $options: "i" },
            };
        }

        //category search
        if (this.queryStr.category) {
            //this needs category to be present in the getURL's params
            const categories = this.queryStr.category.split(",");
            searchObj = { ...searchObj, category: categories };
        }

        this.result = this.model.find({ ...searchObj });

        return this;
    }
}

module.exports = ApiFeatures;
