'use strict';
// ----------------------------------------------------------------------
function createHtmlElement(elemObjName, elemCssClassName, elemObjContent, attrArray) {
  if (!elemObjName) {
    return;
  }
  // else
  const newHtmlElem = document.createElement(elemObjName);
  
  if (elemCssClassName) {
    newHtmlElem.classList.add(elemCssClassName);
  }

  if (elemObjContent) {
    newHtmlElem.textContent = elemObjContent;
  }

  if (attrArray) {  // [{attrName: '', attrValue: ''}, ...] or undefined
    attrArray.forEach(elemOfArr => {
      newHtmlElem.setAttribute(elemOfArr.attrName, elemOfArr.attrValue);
    });
  }

  return newHtmlElem; // returns reference to new li-item
}

// ----------------------------------------------------------------------
function displayButtons() {
  const container = createHtmlElement('div', 'container', null);
  document.body.prepend(container);

  const tooltipWrapper = createHtmlElement( // making wrapper for button because button can't have data-toogle='modal' & data-toogle='tooltip' at the same time
    'div',
    'fb-tooltip-wrapper',
    null,
    [
      {
        attrName: 'data-toggle', // for tooltip
        attrValue: 'tooltip'
      },
      {
        attrName: 'data-placement', // for tooltip
        attrValue: 'top'
      },
      {
        attrName: 'title',
        attrValue:  'i will show you something'
      }
    ]
  );
  container.append(tooltipWrapper);

  const modalPlusTooltipBtn = createHtmlElement(
    'button',
    'btn',
    'TYDYSH',
    [
      {
        attrName: 'type',
        attrValue: 'button'
      },
      {
        attrName: 'data-toggle', // for modal
        attrValue: 'modal'
      },
      {
        attrName: 'data-target', // for modal
        attrValue: '#staticBackdrop'
      }
    ]
  );
  modalPlusTooltipBtn.classList.add('btn-success');
  tooltipWrapper.append(modalPlusTooltipBtn);
  
  // tooltips won't work, they must be initialized with help of bootstrap Jquery
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });

  const alertBtn = createHtmlElement(
    'button',
    'btn',
    'Alert',
    [
      {
        attrName: 'type',
        attrValue: 'button'
      },
      {
        attrName: 'data-switch',
        attrValue: 'off'
      }
    ]
  );
  alertBtn.classList.add('btn-danger');
  container.append(alertBtn);
}

// ----------------------------------------------------------------------
// MODAL BLOCK PART: html template for modal with static !backdrop! was taken from the off bootstrap site
// ----------------------------------------------------------------------
function createModal() {
  const modalWrapper = createHtmlElement('div', 'wrapper');
  modalWrapper.innerHTML = '<div class="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="staticBackdropLabel">Modal title</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>';
  document.body.prepend(modalWrapper);

  modalWrapper.addEventListener('click', handleModalEvents);

  // INNER EVENT HANDLER
  function handleModalEvents(event) { // it will take THIS from lexicalEnvironment of addEventListener which is method of modalWrapper obj )
    if (event.target.matches('.btn-secondary') && event.target.dataset.dismiss === 'modal' || event.target.parentElement.matches('.close')) {
      this.removeEventListener('click', handleModalEvents); // this === modalWrapper
      removeModal();
    }
  }
}

// ----------------------------------------------------------------------
function removeModal() {
  if (document.querySelector('.wrapper')) {
    document.querySelector('.wrapper').remove();
  }
}

// ----------------------------------------------------------------------
function addContentToModalBody() {
  document.querySelector('.wrapper').querySelector('.modal-title').textContent = 'THE KILLING TITLE';
  const someContent = createHtmlElement('div', 'model-body_content', 'Check this out');
  document.querySelector('.modal-body').append(someContent)
}

// ----------------------------------------------------------------------
// ALERT BLOCK PART
// ----------------------------------------------------------------------
function createAlertBlock(text) {
  const alertBlock = createHtmlElement('div', 'alert', text, [{attrName: 'role', attrValue: 'alert'}]);
  alertBlock.classList.add('alert-danger');
  document.querySelector('.container').append(alertBlock);
}

// ----------------------------------------------------------------------
function removeAlertBlock() {
  if (document.querySelector('.alert-danger')) {
    document.querySelector('.alert-danger').remove();
  }
}

// ----------------------------------------------------------------------
// EVENT HANDLER PART
// ----------------------------------------------------------------------
function addEventListenerToContainer() {
  document.querySelector('.container').addEventListener('click', function(event) {
    // 1)
    if (event.target.matches('.btn-danger')) {
      if (event.target.dataset.switch === 'on') {
        removeAlertBlock();
        event.target.setAttribute('data-switch', 'off');

        return;
      }
      createAlertBlock('(╯°□°)╯︵ ┻━┻ GTFO!');
      event.target.setAttribute('data-switch', 'on');

      return;
    }

    // 2)
    if (event.target.matches('.btn-success')) {
      createModal();
      addContentToModalBody();

      return;
    }
  });
}

// ----------------------------------------------------------------------
// MOMENT.JS PART
// ---------------------------------------------------------------------- 1)
function showBirthday() {
  const dateOne = moment('19890131').format('DD-MM-YYYY'); // moment("01-31-1989", "MM-DD-YYYY").format('DD-MM-YYYY');
  const dateTwo = moment('31011989', 'DDMMYYYY').format('Do/MMM/YYYY');//moment('31/01/1989').format('DD-MM-YYYY'); // wrong 01311989 and 31-01-1989 and 31/01/1989 and
  const dateThree = moment('1989-01-31').format('Do MMMM YYYY'); // wrong 1989011
  const showDate = createHtmlElement('div', 'date--show', `My Birthday: ${dateOne} or ${dateTwo} or ${dateThree}`);
  document.querySelector('.container').after(showDate);
}


// ---------------------------------------------------------------------- 2)
function showBirthdayForm() {
  const form = createHtmlElement('form', 'form', null, [{attrName: 'name', attrValue: 'customForm'}]);
  document.querySelector('.date--show').after(form);

  const div = createHtmlElement('div', 'form__input-wrapper', 'Choose your date of birth: ');
  form.append(div);

  const inputDate = createHtmlElement(
    'input',
    'form__input-date',
    null,
    [
      {
        attrName: 'type',
        attrValue: 'date'
      },
      {
        attrName: 'name',
        attrValue: 'inputDate'
      }
    ]
  );
  div.append(inputDate);
}

// ----------------------------------------------------------------------
function addEventListenerToDateInput() {
  document.querySelector('.form__input-date').addEventListener('change', () => {
    removeDateSpan();
    const form = document.forms.customForm;
    const chosenDate = form.elements.inputDate.value;

    let dateStr = validateDate(chosenDate);
    const showDate = createHtmlElement('span', 'span-date--show', ` Your Birthday: ${dateStr}`);
    document.querySelector('.form__input-date').after(showDate);
  });
}

// ----------------------------------------------------------------------
function validateDate(chosenDate) {
  if ( moment(chosenDate).isValid() ) {
    let dateStr = moment(chosenDate).format('Do MMMM YYYY'); // moment().format('DD-MM-YYYY / HH:mm');

    if ( !(moment(chosenDate).format('YYYY').match(/^(19[0-9]{2}|20[01][0-9]|2020)$/)) ) {
      dateStr = "Year must have 4 digits in range from 1900 to 2020";
    }

    if ( moment(chosenDate).format('YYYY').match(/^2020$/) ){
      if ( Number(moment(chosenDate).format('MM')) > Number(moment().format('MM')) ) {
        dateStr = "Incorrect month. Are you from future?";
      } else  if ( Number(moment(chosenDate).format('DD')) > Number(moment().format('DD')) ) {
        dateStr = "Incorrect day. Are you from future?";
      }
    }

    return dateStr;
  }
  // else
  return 'Not Valid Date'; // for using with data not only from input date (also if amount of days is incorrect for specific month)
}

// ----------------------------------------------------------------------
function removeDateSpan() {
  if (document.querySelector('.span-date--show')) {
    document.querySelector('.span-date--show').remove();
  }
}