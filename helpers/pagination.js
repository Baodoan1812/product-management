module.exports =(objectPagination,query,totalItem)=>{
    if(query.page)
        {
            objectPagination.currentPage=parseInt(query.page);
        }
        objectPagination.skipIndex = (objectPagination.currentPage - 1) * objectPagination.limitItem;
        const totalPage=Math.ceil(totalItem/objectPagination.limitItem);
        objectPagination.totalPage=totalPage;
    return objectPagination;    
}