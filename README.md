# HospitalAPI
Building API using Node

 <h4>Tech Stack </h4>
 <ul>
  <li>Node Js</li>
  <li>Mongo Db</li>
  </ul>
 <h4>Local Set Up </h4>
 <p> 
   <b>Step 1 :</b>
   <br>
   Create a File Directory in Your Local System
      and run Command 
      <br>
      <code>
      git clone https://github.com/ManishSaini1/HospitalAPI.git
      </code>
      <br>
   <b>Step 2 :</b>
   <br>   
   Now u have package.json  <br>
   To install
   all dependencies Run Command: <br>
   <code> npm install </code>
      
 </p>
 
<h4>  Available Scripts</h4>
In the project directory, you can run:
</br>
<b>npm start</b>
<p>
Runs the app in the development mode.
Open http://localhost:8000 to view it in the browser.
</p>
<h4>API Calls</h4>
<ol>
<li> To Register Doctor</li>
  <b>Required Fields</b>
    <p>
    name <br>
    email <br>
    password <br>
    API CALL : <code> /doctor/register</code> 
    </p>
    <li>Doctor Login</li>
  <b>Required Fields</b>
    <p>
    email <br>
    password <br>
    API CALL : <code> /doctor/login</code><br>
   <b> Here u recieve a Jwt Token Keep this token Safe</b>
     </p>
      <li>Register Patient</li>
    <b>Required Fields</b>
    <p>
    name <br>
    phone <br>
    <p>
    API CALL : <code>/patients/register</code>
    <br>
      <b>Pass the JWT token in header authentications as bearer to Register Patient </b>
    </p>
   </p>
     <li>Create patient Report</li>
     <b>Required Fields</b>
    <p>
    status <br>
     API CALL : <code>/patients/:id/create_report</code>
     <br>
     <b>Pass the JWT token in header authentications as bearer to Create Report </b>
    <br>
    <b><code>/:id</code> &nbsp pass the Patient Phone Number 
     </b>
    </p>
     <li>All Reports of a Specific Patient</li>
     API CALL : <code>/patients/:id/all_reports</code>
     <br>
     <b><code>/:id</code> &nbsp pass the Patient Phone Number 
     </b>
    </p>
     <li>Reports with specific status</li>
    <p>
     API CALL : <code>/reports/:status</code>
     <br>
     <b><code>/:status</code> &nbsp pass the status </b>
     <br>
     For Example:
     <br>
     <code>
     Negative ,
     Travelled-Quarantine,
     Symptoms-Quarantine,
     Positive-Admit
     </code>
    </p>
    
     
    
</ol>
 
  
  
 
    