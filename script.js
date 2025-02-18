document.getElementById('generateForm').addEventListener('click', function() {
    const studentName = document.getElementById('studentName').value;
    const fatherName = document.getElementById('fatherName').value;
    const fatherCnic = document.getElementById('fatherCnic').value;
    const motherName = document.getElementById('motherName').value;
    const motherCnic = document.getElementById('motherCnic').value;
    const schoolName = document.getElementById('schoolName').value;
    const headmasterName = document.getElementById('headmasterName').value;
    const headmasterContact = document.getElementById('headmasterContact').value;
    const studyingClass = document.getElementById('studyingClass').value;
    const grNumber = document.getElementById('grNumber').value;
    const schoolSemisCode = document.getElementById('schoolSemisCode').value;
    const yearOfAdmission = document.getElementById('yearOfAdmission').value;
    const districtName = document.getElementById('districtName').value;
    const classToApply = document.getElementById('classToApply').value;
    const testDistrict = document.getElementById('testDistrict').value;
    const domicile = document.getElementById('domicile').files[0];
  
    // Display student image and data
    const imagePreview = document.getElementById('imagePreview');
    const studentDetails = document.getElementById('studentDetails');
    
    imagePreview.innerHTML = `<h4>${studentName}'s Image</h4><img src="${URL.createObjectURL(document.getElementById('passportPhoto').files[0])}" width="150px" />`;
  
    studentDetails.innerHTML = `
      <h3>Student Information</h3>
      <p><strong>Father's Name:</strong> ${fatherName}</p>
      <p><strong>Father CNIC:</strong> ${fatherCnic}</p>
      <p><strong>Mother's Name:</strong> ${motherName}</p>
      <p><strong>Mother CNIC:</strong> ${motherCnic}</p>
      <p><strong>School Name:</strong> ${schoolName}</p>
      <p><strong>Headmaster Name:</strong> ${headmasterName}</p>
      <p><strong>Headmaster Contact:</strong> ${headmasterContact}</p>
      <p><strong>Studying Class:</strong> ${studyingClass}</p>
      <p><strong>GR Number:</strong> ${grNumber}</p>
      <p><strong>School SEMIS Code:</strong> ${schoolSemisCode}</p>
      <p><strong>Year of Admission:</strong> ${yearOfAdmission}</p>
      <p><strong>District:</strong> ${districtName}</p>
      <p><strong>Class to Apply:</strong> ${classToApply}</p>
      <p><strong>Test District:</strong> ${testDistrict}</p>
      <p><strong>Domicile:</strong> <img src="${URL.createObjectURL(domicile)}" width="100px" /></p>
    `;
  
    // Display uploaded files
    const uploadedFiles = document.getElementById('uploadedFiles');
    uploadedFiles.innerHTML = `
      <p><strong>Passport Photo:</strong> <img src="${URL.createObjectURL(document.getElementById('passportPhoto').files[0])}" /></p>
      <p><strong>B-form/Birth Certificate:</strong> <img src="${URL.createObjectURL(document.getElementById('bForm').files[0])}" /></p>
      <p><strong>Father CNIC (Front Side):</strong> <img src="${URL.createObjectURL(document.getElementById('fatherCnicFront').files[0])}" /></p>
      <p><strong>Father CNIC (Back Side):</strong> <img src="${URL.createObjectURL(document.getElementById('fatherCnicBack').files[0])}" /></p>
      <p><strong>Mother CNIC (Front Side):</strong> <img src="${URL.createObjectURL(document.getElementById('motherCnicFront').files[0])}" /></p>
      <p><strong>Mother CNIC (Back Side):</strong> <img src="${URL.createObjectURL(document.getElementById('motherCnicBack').files[0])}" /></p>
    `;
  
    // Show the generated form and download button
    document.getElementById('studentImageSection').style.display = 'block';
    document.getElementById('downloadPdf').style.display = 'block';
  });
  
  // PDF Download
  document.getElementById('downloadPdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
     // Add the text content from the form inputs to the PDF
  doc.text(`Student Name: ${document.getElementById('studentName').value}`, 20, 20);
  doc.text(`Father Name: ${document.getElementById('fatherName').value}`, 20, 30);
  doc.text(`Father CNIC: ${document.getElementById('fatherCnic').value}`, 20, 40);
  doc.text(`Mother Name: ${document.getElementById('motherName').value}`, 20, 50);
  doc.text(`Mother CNIC: ${document.getElementById('motherCnic').value}`, 20, 60);
  doc.text(`School Name: ${document.getElementById('schoolName').value}`, 20, 70);
  doc.text(`Headmaster Name: ${document.getElementById('headmasterName').value}`, 20, 80);
  doc.text(`Headmaster Contact: ${document.getElementById('headmasterContact').value}`, 20, 90);
  doc.text(`Studying Class: ${document.getElementById('studyingClass').value}`, 20, 100);
  doc.text(`GR Number: ${document.getElementById('grNumber').value}`, 20, 110);
  doc.text(`School SEMIS Code: ${document.getElementById('schoolSemisCode').value}`, 20, 120);
  doc.text(`Year of Admission: ${document.getElementById('yearOfAdmission').value}`, 20, 130);
  doc.text(`District Name: ${document.getElementById('districtName').value}`, 20, 140);
  doc.text(`Class to Apply: ${document.getElementById('classToApply').value}`, 20, 150);
  doc.text(`Test District: ${document.getElementById('testDistrict').value}`, 20, 160);

  // Add uploaded file images (assuming the files are image files)
  const imageFiles = [
    'domicile',
    'passportPhoto',
    'bForm',
    'fatherCnicFront',
    'fatherCnicBack',
    'motherCnicFront',
    'motherCnicBack'
  ];

  let yPosition = 170; // Starting Y position for the images

  imageFiles.forEach((fileId) => {
    const fileInput = document.getElementById(fileId);
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        doc.addImage(e.target.result, 'JPEG', 20, yPosition, 180, 100); // Adjust image size
        yPosition += 110; // Update Y position for the next image
        if (yPosition > 250) { // If the page is full, add a new page
          doc.addPage();
          yPosition = 20;
        }
        // After all images are processed, save the PDF
        if (fileId === imageFiles[imageFiles.length - 1]) {
          doc.save('student_form.pdf');
        }
      };
      reader.readAsDataURL(file);
    }
  });
});
  