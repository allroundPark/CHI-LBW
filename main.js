let productID; //  Will start from 0 and will end with 1
let reviewID;  //  From 0 to 20(?) 
let result;     // JSON that will contain the entire study data

window.onbeforeunload = function(){
    return '지금 페이지를 이동하면 입력 중인 데이터를 잃으실 수 있습니다.';
};
  
window.addEventListener("load", ()=>{
    // This method will run after loading all the resources
    productID = 0;
    reviewID = 0;
    result = {};
});


function goPageNum(pn){
    // open page pn
    document.querySelectorAll(".page").forEach(el=>{
        el.classList.add("hidden");  
    });
    document.querySelectorAll(".page[pageNum='"+pn+"']").forEach(el=>{
        el.classList.remove("hidden");
    });
}



