// 2022/11/08
// bbc-mc@github.com


function onChangeValue(){

    let mergeParam = gradioApp().querySelector("#tab_modelmerger > div > div > div").querySelectorAll("input")[0];
    let div_mdl_a = gradioApp().querySelector("#div_mdl_size_a");
    let div_mdl_b = gradioApp().querySelector("#div_mdl_size_b");
    let div_mdl_c = gradioApp().querySelector("#div_mdl_size_c");

    let is_WS = gradioApp().querySelector("#tab_modelmerger > div > div > div").querySelectorAll("input")[3].checked;
    let is_AD = gradioApp().querySelector("#tab_modelmerger > div > div > div").querySelectorAll("input")[4].checked;

    // weighted_sum,    A*M + B*(1-M)
    // add_differencef, A + (B-C)*M
    if (is_WS) {
        let param_b = mergeParam.value * 10000;
        param_b = param_b.toFixed(4) / 100;
        let param_a = 100 - param_b;

	    div_mdl_a.innerHTML = "Model A : " + param_a + "%";
	    div_mdl_a.style.width = "" + param_a + "%";

	    div_mdl_b.innerHTML = "Model B : " + param_b + "%";
	    div_mdl_b.style.width = "" + param_b + "%";
	    div_mdl_b.style.display = "";

	    div_mdl_c.style.display = "none";
	}else if (is_AD){

	    div_mdl_a.innerHTML = "unknown. it depends.";
	    div_mdl_a.style.width = "100%";

	    div_mdl_b.style.display = "none";
	    div_mdl_c.style.display = "none";

	}else{
	    div_mdl_a.innerHTML = "unknown method ?";
	    div_mdl_a.style.width = "100%";

	    div_mdl_b.style.display = "none";
	    div_mdl_c.style.display = "none";
	}

}

//
// UI
//
onUiUpdate(function () {

    let _parent = gradioApp().querySelector("div#modelmerger_result");
    if (_parent == null ) return;
    if (gradioApp().querySelector("#div_mdl_size_a") != null) return;

    let _base_div1 = document.createElement("div");
    let _div_t1 = document.createElement("div");
    let _div_t2 = document.createElement("div");
    let _div_t3 = document.createElement("div");
    let _base_div2 = document.createElement("div");
    let _div_A = document.createElement("div");
    let _div_B = document.createElement("div");
    let _div_C = document.createElement("div");

    _div_t1.innerHTML = "weighted_sum  : (1-M)*A + M*B";
    _div_t2.innerHTML = "add_difference: A + M*(B-C)";
    _div_t3.innerHTML = "%value is toFixed(2).";
    _base_div1.appendChild(_div_t1);
    _base_div1.appendChild(_div_t2);
    _base_div1.appendChild(_div_t3);

    _base_div2.setAttribute("style", "display: flex;");

    _div_A.id = "div_mdl_size_a";
    _div_A.innerHTML = "Model A";
    _div_A.setAttribute("style", "text-align:center; width:30%; height:30px; background-color:green;");
    _base_div2.appendChild(_div_A);

    _div_B.id = "div_mdl_size_b";
    _div_B.innerHTML = "Model B";
    _div_B.setAttribute("style", "text-align:center; width:70%; height:30px; background-color:red; display:");
    _base_div2.appendChild(_div_B);

    _div_C.id = "div_mdl_size_c";
    _div_C.innerHTML = "Model C";
    _div_C.setAttribute("style", "text-align:center; width:0%; height:30px; background-color:red; display:none;");
    _base_div2.appendChild(_div_C);

    _parent.appendChild(_base_div1);
    _parent.appendChild(_base_div2);

    gradioApp().querySelector("#tab_modelmerger > div > div > div").querySelectorAll("input")[0].addEventListener("input", onChangeValue);
    gradioApp().querySelector("#tab_modelmerger > div > div > div").querySelectorAll("input")[1].addEventListener("change", onChangeValue);
    gradioApp().querySelector("#tab_modelmerger > div > div > div").querySelectorAll("input")[2].addEventListener("change", onChangeValue);
    gradioApp().querySelector("#tab_modelmerger > div > div > div").querySelectorAll("input")[3].addEventListener("change", onChangeValue);
    gradioApp().querySelector("#tab_modelmerger > div > div > div").querySelectorAll("input")[4].addEventListener("change", onChangeValue);

});
