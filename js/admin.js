$(document).ready(function(){
    $("div#mdfuuid button#udp").click(function(){
        var temp=$("div#mdfuuid input#inp").val();
        var myReg = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i; //uuidv4正则
        if(!myReg.test(temp)){
            show_err_msg('The format of the device ID is incorrect！');
        }
        else{
            console.log(temp);
            save("fuuid",temp);
            save("uuid",temp);
            alert("Modified successfully");
        }

    })
})


function save(data_name,save_data){localStorage.setItem(data_name,save_data);}
function load(data_name){return localStorage.getItem(data_name);}