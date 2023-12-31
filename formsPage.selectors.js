module.exports = {
    selector: {
        practiceFormLink: 'span=Practice Form',
        firstName: '#firstName',
        lastName: '#lastName',
        userEmail: '#userEmail',
        gender: '#genterWrapper .custom-control-label',
        mobile: '#userNumber',
        dateWrapper: '#dateOfBirth',
        date: '#dateOfBirthInput',
        monthSelection: '.react-datepicker__month-select',
        yearSelection: '.react-datepicker__year-select',
        daySelection: (day) => `[aria-label="${day}"]`,
        subjectField: '#subjectsInput',
        hobbies: '#hobbiesWrapper .custom-control-label',
        sportsHobby: '#hobbies-checkbox-1',
        readingHobby: '#hobbies-checkbox-2',
        musicHobby: '#hobbies-checkbox-3',
        currentAddressField: '#currentAddress',
        state: "#state",
        stateValues: '.css-26l3qy-menu',
        city: '#city',
        stateDropdown: '#state .css-1wa3eu0-placeholder',
        submitButton: '#submit',
        thanksText: '#example-modal-sizes-title-lg',
        closeButton: '.modal-content button#closeLargeModal',
    },
  };
  