
var socket = io();

var sid_client;
socket.on('connect', function() {
  sid_client = socket.id;
  var btn_list = document.getElementById("listMailsBtn");
  btn_list.classList.remove("disabled");
});

socket.on('log_info', function(msg) {
  var log_text = document.getElementById("logText");
  log_text.classList.remove("d-none");
  var log_div = document.querySelector(".card-body.overflow-auto");
  var p_log = document.querySelector("p.m-0");
  var new_text = "[INFO] " + msg + "&#10;";
  p_log.textContent = p_log.textContent + new_text;
  log_div.scrollTop = log_div.scrollHeight;
});

socket.on('log_warning', function(msg) {
  var log_text = document.getElementById("logText");
  log_text.classList.remove("d-none");
  var log_div = document.querySelector(".card-body.overflow-auto");
  var p_log = document.querySelector("p.m-0");
  var new_text = "[WARNING] " + msg + "&#10;";
  p_log.textContent = p_log.textContent + new_text;
  log_div.scrollTop = log_div.scrollHeight;
});

socket.on('log_error', function(msg) {
  var log_text = document.getElementById("logText");
  log_text.classList.remove("d-none");
  var log_div = document.querySelector(".card-body.overflow-auto");
  var p_log = document.querySelector("p.m-0");
  var new_text = "[ERROR] " + msg + "&#10;";
  p_log.textContent = p_log.textContent + new_text;
  log_div.scrollTop = log_div.scrollHeight;
});

socket.on('log_success', function(msg) {
  var log_text = document.getElementById("logText");
  log_text.classList.remove("d-none");
  var log_div = document.querySelector(".card-body.overflow-auto");
  var p_log = document.querySelector("p.m-0");
  var new_text = "[SUCCESS] " + msg + "&#10;";
  p_log.textContent = p_log.textContent + new_text;
  log_div.scrollTop = log_div.scrollHeight;
});

function list_emails() {

  var btn_list = document.getElementById("listMailsBtn");
  var progress_bar = document.getElementById("progressBar");
  var desc_div = document.getElementById("descDiv");
  var div_table = document.getElementById("divDataTable");

  btn_list.classList.add("disabled");
  btn_list.classList.add("d-none");
  progress_bar.classList.remove("d-none");
  desc_div.classList.add("d-none");
  div_table.classList.add("d-none");

  var request = new XMLHttpRequest();
  request.open('GET', '/list', true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      progress_bar.classList.add("d-none");
      div_table.classList.remove("d-none");
      if(data.length == 0) {
        var tbody = document.querySelector("tbody");
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.colSpan = 7;
        td.textContent = "No emails to process!";
        td.style.textAlign = "center";
        tr.appendChild(td);
        tbody.appendChild(tr);
      } else {
        var tbody = document.querySelector("tbody");
        data.forEach(function(element) {
          var tr = document.createElement("tr");
          tr.style.cursor = "pointer";

          var td_uid = document.createElement("td");
          td_uid.textContent = element.mailUID;
          tr.appendChild(td_uid);

          var td_date = document.createElement("td");
          td_date.textContent = element.date;
          tr.appendChild(td_date);

          var td_from = document.createElement("td");
          td_from.textContent = element.from;
          tr.appendChild(td_from);

          var td_subj_ext = document.createElement("td");
          td_subj_ext.textContent = element.subject;
          tr.appendChild(td_subj_ext);

          var td_body_ext = document.createElement("td");
          td_body_ext.textContent = element.body;
          tr.appendChild(td_body_ext);

          var td_subj_int = document.createElement("td");
          td_subj_int.textContent = element.attachedMail;
          tr.appendChild(td_subj_int);

          var td_btn = document.createElement("td");
          var btn_analyze = document.createElement("button");
          btn_analyze.textContent = "Analyze";
          btn_analyze.type = "button";
          btn_analyze.className = "btn btn-primary border rounded";
          btn_analyze.style.background = "rgb(40,106,149)";
          btn_analyze.onclick = function() {
            analyze_email(element.mailUID);
          };
          td_btn.appendChild(btn_analyze);
          tr.appendChild(td_btn);

          tbody.appendChild(tr);
        });
      }
    } else {
      btn_list.classList.remove("disabled");
      btn_list.classList.remove("d-none");
      progress_bar.classList.add("d-none");
      desc_div.classList.remove("d-none");
    }
  };
  request.onerror = function() {
    btn_list.classList.remove("disabled");
    btn_list.classList.remove("d-none");
    progress_bar.classList.add("d-none");
    desc_div.classList.remove("d-none");
  };
  request.send();

}

function analyze_email(mailUID) {

  var btn_list = document.getElementById("listMailsBtn");
  var progress_bar = document.getElementById("progressBar");
  var desc_div = document.getElementById("descDiv");
  var div_table = document.getElementById("divDataTable");
  var div_result = document.getElementById("divResult");

  btn_list.classList.add("disabled");
  btn_list.classList.add("d-none");
  progress_bar.classList.remove("d-none");
  desc_div.classList.add("d-none");
  div_table.classList.add("d-none");
  div_result.classList.add("d-none");

  var formData = new FormData();
  formData.append('mailUID', mailUID);
  formData.append('sid', sid_client);

  var request = new XMLHttpRequest();
  request.open('POST', '/analysis', true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var verdict = JSON.parse(request.responseText);
      var div_result = document.getElementById("divResult");
      var p_verdict_title = document.querySelector("#divResult p:first-child");
      var p_verdict_res = document.querySelector("#divResult p:last-child");
      var go_back = document.getElementById("goBackLink");
      if(verdict == "Malicious") {
        p_verdict_title.style.background = "rgb(255,100,100)";
      } else if(verdict == "Suspicious") {
        p_verdict_title.style.background = "rgb(255,212,37)";
      } else {
        p_verdict_title.style.background = "rgb(100,255,100)";
      }
      p_verdict_title.textContent = verdict;
      p_verdict_res.textContent = "You can now interact with TheHive and Cortex to check the details of the analysis using the buttons on the left.";
      progress_bar.classList.add("d-none");
      div_result.classList.remove("d-none");
      go_back.classList.remove("d-none");
    } else {
      btn_list.classList.remove("disabled");
      btn_list.classList.remove("d-none");
      progress_bar.classList.add("d-none");
      desc_div.classList.remove("d-none");
    }
  };
  request.onerror = function() {
    btn_list.classList.remove("disabled");
    btn_list.classList.remove("d-none");
    progress_bar.classList.add("d-none");
    desc_div.classList.remove("d-none");
  };
  request.send(formData);

}
