$(document).ready(function(){
    
    $("li a").click(function(){
        $(this).parent().siblings().children().removeClass("active");
        $(this).addClass("active");
        var temp=$(this).attr("href").replace(/#/g,"");
        $("div#content iframe").attr("src","./"+temp+".html");
    })
})

$(document).ready(function(){
    $("div#refresh button").click(function(){
        var isadmin=load("isadmin")==="true";
        if(isadmin)
        {
            $("div#guide h1").text(load("uuid"));
        }
    })
})

function save(data_name,save_data){localStorage.setItem(data_name,save_data);}
function load(data_name){return localStorage.getItem(data_name);}

$(document).ready(function(){
    
    var isadmin=load("isadmin")==="true";
    if(isadmin)
    {
        console.log("is admin");
    }
    else 
    {
        console.log("is user");

        $("div#guide li#admin").hide();
        $("div#guide li#log_out").hide();
    }
    
    console.log("get deviceid:"+sessionStorage.getItem("uuid"));
    $.get("https://cloud-api.ifan.dev:8/api/timestamp",function(data,status,fn){
        save("timestamp",data);
        console.log("successtimestamp");
        $.get("https://device-api.ifan.dev:8/ticket?ts="+data,function(data2,status2,fn2){
            save("ticket",data2);
            console.log("successticket");
        })
    })
})