var modalForm = new ModalFormListener();

function ModalFormListener(){
    var that = this;
    this.config = {
        apiUrl: '/avtolike/proc/processor.php'
    };
    this.patterns = {
        name: '[A-Za-zА-Яа-я]{2,10}[ ]{0,1}[A-Za-zА-Яа-я]{0,12}',
        phone: '[0-9-_()+ ]{10,18}',
        email: '(.)+(@){1}(.){4,25}',
        avto: '[A-Za-zА-Яа-я0-1]{5,}',
        description: '.{4,}',
        default: ''
    };
    this.placeholders = {
        name: 'Имя',
        phone: 'Телефон',
        email: 'Email',
        avto: 'Авто',
        description: 'Ваш текст',
        default: ''
    };
    this.maxlengths = {
        name: 22,
        phone: 18,
        email: 50,
        avto: 20,
        description: '1000',
        default: ''
    };
    this.errors = {
        default: 'Заполните правильно поля'
    };
    this.messages = {
        dataSent: 'Данные были успешно отправлены нашему менеджеру. <br /> В ближайшее время он свяжется с вами.'
    };
    this.buildEl = function(tagName, classes, content){
        var el = document.createElement(tagName || 'div');
        el.className = classes || '';
        el.innerHTML = content || '';
        return el;
    };
    this.sendToServer = function(data){
        console.info('sending data to server');
        console.log('data: ', data);
        var xhr = new XMLHttpRequest();

        xhr.open('GET', that.config.apiUrl);
        //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
        xhr.onreadystatechange = function() {
            if (this.readyState == 4) {
                that.alert(xhr.responseText);
            }

        }
    };

    this.validateInput = function(inputName, inputValue){
        console.info('validating input: ', inputName, 'with value', inputValue);
        var patt = new RegExp(this.patterns[inputName]);
        return (patt.test(inputValue));
    };

    this.validateForm = function(targetNode){
        console.info('begin form validation, node: ', targetNode);
        var formRoot, formHeading, formInputs;

        formRoot = closest(targetNode, '.js-form');
        formHeading = formRoot.querySelector('.js-heading').innerHTML.trim();
        formInputs = formRoot.querySelectorAll('input');

        if (formInputs.length) {
            var validInputsQty = 0;
            var dataUrl = 'page=' + window.location.hostname + window.location.pathname;
            for (var i = 0; i < formInputs.length; i++){
                var inputName = formInputs[i].getAttribute('name') || null;
                var inputValue = formInputs[i].value || null;

                if (inputName && inputValue && this.validateInput(inputName, inputValue)){
                    formInputs[i].classList.remove('modal-form__input--invalid');
                    validInputsQty++;
                    dataUrl += '&' + inputName + '=' + inputValue;
                } else {
                    formInputs[i].classList.add('modal-form__input--invalid');
                }
            }

            var errorBox = formRoot.querySelector('.m-error');
            if (validInputsQty === formInputs.length){
                // all input values are valid

                // 1 отправить данные серверу , 2 очистить поля, 3 закрыть окно, 4 сообщить, что отправка прошла успешно

                this.sendToServer(dataUrl);

                if (errorBox){
                    errorBox.innerHTML = '';
                }

                for (var j = 0; j < formInputs.length; j++) {
                    formInputs[j].value = '';
                    console.log('empty this: ', formInputs[j]);
                }

                this.destroyWin('modal-form');

            } else {
                // not all inputs are valid

                if (errorBox) {
                    errorBox.innerHTML = this.errors.default;
                    errorBox.classList.add('active');
                } else {
                    this.alert(this.errors.default);
                }
            }
        }
    };

    this.buildWin = function(headingText, buttonText, inputs, target){
        var hangClass = target.dataset.hangClass || '';
        console.info('window is building');
        var modalForm, modalFormWindow, modalFormClose, modalFormHeading, modalFormForm,
            modalFormInputs, modalFormSubmit, modalFormError, modalFormFormElement;

        modalForm = this.buildEl('div', 'modal-form js-form root-form ' + hangClass);
        modalFormWindow = this.buildEl('div', 'modal-form__window');
        modalFormClose = this.buildEl('div', 'modal-form__close', '&#10005;');
        modalFormClose.onclick = function(){
            that.destroyWin('modal-form');
        };
        modalFormHeading = this.buildEl('div', 'modal-form__heading m-heading js-heading', headingText);
        modalFormForm = this.buildEl('div', 'modal-form__form');
        var fForm = this.buildEl('form');
        var tagName;

        modalFormInputs = '';
        inputs = inputs.split(',');
        if(inputs.length) {
            for (var i = 0; i < inputs.length; i++) {
                tagName = (inputs[i] == 'description') ? 'textarea' : 'input';
                modalFormInputs += '<' + tagName + ' name="' + inputs[i] + '" class="modal-form__input" pattern="' +
                        that.patterns[inputs[i]] + '" placeholder="' + that.placeholders[inputs[i]] + '" maxlength="' +
                        that.maxlengths[inputs[i]] + '" type="text" />';
            }

        }

        modalFormSubmit = document.createElement('button');
        modalFormSubmit.setAttribute('type', 'button');
        modalFormSubmit.className = 'blue modal-form__submit';
        modalFormSubmit.innerHTML = buttonText;
        modalFormSubmit.onclick = function(e){
            that.validateForm(e.target);
        };

        modalFormFormElement = this.buildEl('div', 'modal-form__form-element');
        modalFormError = this.buildEl('div', 'modal-form__error m-error');

        // Appending to DOM

        modalFormFormElement.innerHTML = modalFormInputs;
        modalFormFormElement.appendChild(modalFormSubmit);

        modalFormForm.appendChild(modalFormFormElement);

        var mForm = this.buildEl('form');
        mForm.appendChild(modalFormClose);
        mForm.appendChild(modalFormHeading);
        mForm.appendChild(modalFormForm);
        mForm.appendChild(modalFormError);

        modalFormWindow.appendChild(mForm);
        modalForm.appendChild(modalFormWindow);
        document.body.insertBefore(modalForm, document.body.firstChild);

    };

    this.alert = function(msg){
        console.info('alerted', msg);

        var modalAlert, modalAlertWindow, modalAlertMessage, modalAlertConfirm, modalAlertControls;

        modalAlert = this.buildEl('div', 'modal-alert');
        modalAlertWindow = this.buildEl('div', 'modal-alert__window');
        modalAlertMessage = this.buildEl('p', 'modal-alert__message', msg);
        modalAlertControls = this.buildEl('div', 'modal-alert__controls');
        modalAlertConfirm = this.buildEl('button', 'modal-alert__confirm blue', 'OK');
        modalAlertConfirm.onclick = function(){
            that.destroyWin('modal-alert');
        };

        // Appending to DOM

        modalAlertControls.appendChild(modalAlertConfirm);
        modalAlertWindow.appendChild(modalAlertMessage);
        modalAlertWindow.appendChild(modalAlertControls);
        modalAlert.appendChild(modalAlertWindow);
        document.body.insertBefore(modalAlert, document.body.firstChild);
    };

    this.listen = function(){
        document.body.addEventListener('click', function(e){
            if (e.target.hasAttribute('data-action')) {
                if (e.target.dataset.action == 'validate-form') {
                    that.validateForm(e.target);
                }
                if (e.target.dataset.action == 'build-modal') {
                    that.buildWin(e.target.dataset.modalHeading, e.target.innerHTML, e.target.dataset.modalInputs, e.target);

                }
            }
        });
    };

    this.destroyWin = function(className){
        console.info('destroing window');
        var targ = document.body.querySelector('.' + className);
        targ && document.body.removeChild(targ);
    };

    this.listen();
}






