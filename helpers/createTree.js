let cnt=0;
function createTree(arr, parentId=""){
    const tree=[];
    arr.forEach(item => {
        if(item.parent_id===parentId){
            cnt++;
            item.index=cnt;
            const newItem= item;
            const children =createTree(arr,item.id);
            if(children.length>0){
                newItem.children =children;
            }
            tree.push(newItem);
        }
    });
    return tree;
}

module.exports.treeCreate=(arr,parentId="")=>{
    cnt=0;
    const tree=createTree(arr,parentId);
    return tree;
}