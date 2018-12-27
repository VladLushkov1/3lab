var flag = false;

function pick(branch)
{
    var shedule = branch+"_shedule";
    if(branch == "hirurg")
    {
        var sh = document.getElementById("nerv_shedule");
        sh.style.display = "none";
        var sh = document.getElementById(shedule);
        sh.style.display = "block";

        var bt = document.getElementById("nerv");
        bt.checked = false;

    }
    if(branch == "nerv")
    {
        var sh = document.getElementById("hirurg_shedule");
        sh.style.display = "none";
        var sh = document.getElementById(shedule);
        sh.style.display = "block";
        var bt = document.getElementById("hirurg");
        bt.checked = false;
    }
}

function showall(){
    var sh = document.getElementById("nerv_shedule");
    sh.style.display = "block";
    var sh = document.getElementById("hirurg_shedule");
    sh.style.display = "block";
    var bt = document.getElementById("hirurg");
    bt.checked = false;
    var bt = document.getElementById("nerv");
    bt.checked = false;
}


function regim()
{
    if(flag == false)
    {
        document.body.style.fontSize='25px';
        document.body.style.color='000';
        flag = true;
    }
    else{
        document.body.style.fontSize='16px';
        document.body.style.color='000';
        flag = false;
    }
}