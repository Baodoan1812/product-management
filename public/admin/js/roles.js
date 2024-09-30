//permissons
const tablePermission=document.querySelector("[table-permissions]")
if(tablePermission){
    const submitButton= document.querySelector("[button-submit]");
    submitButton.addEventListener("click",()=>{
        let permissions =[];
        const rows= document.querySelectorAll("[data-name]");
        rows.forEach(row=>{
            const name= row.getAttribute("data-name");
            const inputs= row.querySelectorAll('input');
            if(name=="id"){ 
            inputs.forEach(input=>{
                const id=input.value;
                permissions.push({
                    id:id,
                    permission:[]
                });
            })
            }
            else{
                inputs.forEach((input,index)=>{
                    const checked = input.checked;
                    if(checked){
                        permissions[index].permission.push(name);
                    }
                })
            }
            
        })
        const formChangePermissions= document.querySelector("#form-change-permissons")
        if(formChangePermissions){
            const input = formChangePermissions.querySelector("[name='permissions'")
            input.value=JSON.stringify(permissions);
            formChangePermissions.submit();
        }
    })
   
}

// insert update
const dataRecords= document.querySelector("[data-records]");
if(dataRecords){
    const tablePermission=document.querySelector("[table-permissions]")
    const records= JSON.parse(dataRecords.getAttribute('data-records'));
    records.forEach((item,index)=>{
        const permissions= item.permission;
        permissions.forEach((permission)=>{
        const row= tablePermission.querySelector(`[data-name='${permission}']`);
            const input= row.querySelectorAll('input')[index];
            input.checked=true;
        })
    })
}

