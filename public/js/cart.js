const inputs= document.querySelectorAll("[name='quantity']");
if(inputs.length>0){
    inputs.forEach(item=>{
        item.addEventListener("change",(e)=>{
            const val=e.target.value;
            const productId= item.getAttribute("product_id");
        window.location.href= `/cart/update/${productId}/${val}`    
    })
})
}