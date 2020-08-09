  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    'use strict';

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');

    const nea_location = document.getElementById('nea_location');
    const locationLists = document.getElementById('datalistOptions');
    const fromDateElm = document.getElementById('from_date');
    const toDateElm = document.getElementById('to_date');

    function validateDatalist() {
      const locationName = nea_location.value;
      const existList = locationLists.querySelectorAll("option[value='" + locationName.toLocaleUpperCase() + "']");
      console.log('locationName:', locationName, existList.length);
      if (existList != null && existList.length > 0) {
        nea_location.setCustomValidity('');
        // nea_location.classList.add('is-valid');
        // nea_location.classList.remove('is-invalid');
      } else {
        nea_location.setCustomValidity("Please choose valid location only from the list")
        // nea_location.classList.add('is-invalid');
        // nea_location.classList.remove('is-valid');
      }
    }

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        validateDatalist();
        form.classList.add('was-validated');
      }, false);
    });

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    const yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd;
    }
    if(mm<10){
      mm='0'+mm;
    }

    today = yyyy+'-'+mm+'-'+dd;
    fromDateElm.setAttribute("max", today);
    toDateElm.setAttribute("max", today);

    fromDateElm.addEventListener("change", function() {
      dateValidity(true);
    });
    toDateElm.addEventListener("change", function() {
      dateValidity(false);
    });

    function dateValidity(fromChanged) {
      if(!fromDateElm.value || !toDateElm.value) {
        return null;
      }

      const fromDate = new Date(fromDateElm.value);
      const toDate = new Date(toDateElm.value);

      console.log(fromDate, toDate);
      if(fromDate > toDate) {
        if(fromChanged) {
          toDateElm.value = fromDateElm.value;
        } else {
          fromDateElm.value = toDateElm.value;
        }
      }
    }

    nea_location.addEventListener("change", validateDatalist);

})();
