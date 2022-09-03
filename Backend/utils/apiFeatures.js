class ApiFeatures {
    constructor(dbModel, queryStr){
        this.model = dbModel;
        this.queryStr = queryStr;
        this.result = null;
        // console.log(queryStr)
    }

    search () {
        let searchObj = {}

        if(this.queryStr.name){
            searchObj = {...searchObj, name: {$regex: this.queryStr.name,
                $options: "i"}}
        }

        // let categories = []
        // for(let key in this.queryStr){ //in the GET Request,we get categories as Laptop=on&Cellphone=on
        //     if(key !="name" && key!="price"){
        //         categories.push(key)
        //     }
        // }

        // if(categories.length){
        //     searchObj = {...searchObj, category: categories}
        // }

        if(this.queryStr.category){ //this needs category to be present in the getURL's params
            const categories = this.queryStr.category.split(',');
            searchObj = {...searchObj, category: categories}
        }
        // const name = this.queryStr.name ? 
        // {
        //     name: {
        //         $regex: this.queryStr.name,
        //         $options: "i",
        //     }
        // }:{};

        // // console.log(name)
        this.result = this.model.find({...searchObj});

        return this

    }
}

module.exports = ApiFeatures;