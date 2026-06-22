document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registrationForm');
  const successMessage = document.getElementById('formSuccess');

  const fields = {
    firstName: {
      input: document.getElementById('firstName'),
      error: document.getElementById('firstNameError'),
      validate: function (value) {
        if (value.trim() === '') return "Введіть ім'я.";
        if (value.trim().length < 2) return "Ім'я має містити щонайменше 2 символи.";
        return '';
      }
    },
    lastName: {
      input: document.getElementById('lastName'),
      error: document.getElementById('lastNameError'),
      validate: function (value) {
        if (value.trim() === '') return 'Введіть прізвище.';
        if (value.trim().length < 2) return 'Прізвище має містити щонайменше 2 символи.';
        return '';
      }
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('emailError'),
      validate: function (value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.trim() === '') return 'Введіть електронну пошту.';
        if (!emailPattern.test(value.trim())) return 'Введіть коректну електронну пошту.';
        return '';
      }
    },
    password: {
      input: document.getElementById('password'),
      error: document.getElementById('passwordError'),
      validate: function (value) {
        if (value === '') return 'Введіть пароль.';
        if (value.length < 6) return 'Пароль має містити щонайменше 6 символів.';
        return '';
      }
    }
  };

  function showError(fieldKey, message) {
    const field = fields[fieldKey];
    field.error.textContent = message;
    field.input.classList.toggle('invalid', Boolean(message));
  }

  function validateField(fieldKey) {
    const field = fields[fieldKey];
    const message = field.validate(field.input.value);
    showError(fieldKey, message);
    return message === '';
  }

  // Validate on blur (when user leaves a field)
  Object.keys(fields).forEach(function (fieldKey) {
    fields[fieldKey].input.addEventListener('blur', function () {
      validateField(fieldKey);
    });

    // Clear error while typing once the user starts fixing it
    fields[fieldKey].input.addEventListener('input', function () {
      if (fields[fieldKey].error.textContent !== '') {
        validateField(fieldKey);
      }
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let isFormValid = true;
    Object.keys(fields).forEach(function (fieldKey) {
      const valid = validateField(fieldKey);
      if (!valid) isFormValid = false;
    });

    if (isFormValid) {
      successMessage.textContent = 'Реєстрація успішна! Дякуємо.';
      form.reset();
      Object.keys(fields).forEach(function (fieldKey) {
        fields[fieldKey].input.classList.remove('invalid');
      });
    } else {
      successMessage.textContent = '';
    }
  });
});
