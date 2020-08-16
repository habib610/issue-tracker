document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id === id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter( issue.id !== id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
}


// for new issues adding bottom
const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];
    //top issue display
    if(i != 0)
    {
      document.getElementById('totalIssue').innerText = i+1;
      document.getElementById('open').innerText = i+1;
    }


    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 class="strikeThrough"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>

                              <button class="btn btn-warning closeBtn">Close</button>
                             


                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }




  // close btn workflow
  const closeBtn =document.querySelectorAll('.closeBtn');
  const strikeThrough =document.querySelectorAll('.strikeThrough');
  
  for(let i = 0; i < closeBtn.length; i++){
  closeBtn[i].addEventListener('click', ()=>{
    const deleted = strikeThrough[i].innerHTML;
    strikeThrough[i].innerHTML = `<del>${deleted}</del>`; // deleted done
    let currentTotalIssue = document.getElementById('open').innerText;
    document.getElementById('open').innerText = currentTotalIssue - 1;
    })
  }

  // delete button workflow
  
  
}
