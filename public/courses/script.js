// function SearchFun() {
//     console.log("in search function");
//     let data = document.getElementById("inval").value.toUpperCase();
//     let details = document.getElementById("details");
//     let tr = details.getElementsByTagName("tr");
//     for (var i = 0; i < tr.length; i++) {
//         let td = tr[i].getElementsByTagName("td")[0];
//         if (td) {
//             let val = td.textContet || td.innerHTML;
//             if (val.toUpperCase().indexOf(data) > -1) {
//                 tr[i].style.display = "";
//             } else {
//                 tr[i].style.display = "none";
//             }
//         }
//     }
// }

// function ADD() {
//     console.log("in add function");
//     var tab1 = document.getElementById("details");
//     var tab2 = document.getElementById("display");
//     var check = document.getElementsByName("select");
//     for (var i = 0; i < check.length; i++) {
//         if (check[i].checked) {
//             var ins = tab2.insertRow(tab2.length);
//             var r1 = ins.insertCell(0);
//             var r2 = ins.insertCell(1);
//             var r3 = ins.insertCell(2);
//             var r4 = ins.insertCell(3);
//             var r5 = ins.insertCell(4);


//             r1.innerHTML = tab1.rows[i + 1].cells[0].innerHTML;
//             r2.innerHTML = tab1.rows[i + 1].cells[1].innerHTML;
//             r3.innerHTML = tab1.rows[i + 1].cells[2].innerHTML;
//             r4.innerHTML = tab1.rows[i + 1].cells[3].innerHTML;
//             r5.innerHTML = "<input type='checkbox'  name='drop'>";

//             var x = tab1.rows[i + 1].rowIndex;
//             tab1.deleteRow(x);
//             i--;


//         }
//     }
// }

// function DROP() {
//     console.log("in drop function");
//     var tab1 = document.getElementById("details");
//     var tab2 = document.getElementById("display");
//     var check = document.getElementsByName("drop");
//     for (var i = 0; i < check.length; i++) {
//         if (check[i].checked) {
//             var ins = tab1.insertRow(tab1.length);
//             var r1 = ins.insertCell(0);
//             var r2 = ins.insertCell(1);
//             var r3 = ins.insertCell(2);
//             var r4 = ins.insertCell(3);
//             var r5 = ins.insertCell(4);


//             r1.innerHTML = tab2.rows[i + 1].cells[0].innerHTML;
//             r2.innerHTML = tab2.rows[i + 1].cells[1].innerHTML;
//             r3.innerHTML = tab2.rows[i + 1].cells[2].innerHTML;
//             r4.innerHTML = tab2.rows[i + 1].cells[3].innerHTML;
//             r5.innerHTML = "<input type='checkbox'  name='select1'>";

//             var x = tab2.rows[i + 1].rowIndex;
//             tab2.deleteRow(x);
//             i--;


//         }
//     }
// }