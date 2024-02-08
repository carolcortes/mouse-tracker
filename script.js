document.addEventListener('DOMContentLoaded', function () {
  const username = document.querySelector('.user');
  let activeTest = 1;
  let result = {
    user_id: '',
    data: {
      test_box_1: [],
      test_box_2: [],
      test_box_3: [],
      test_box_4: [],
      test_box_5: [],
    },
  };

  const saveButton = document.querySelector('.save_button');
  const initButtons = document.querySelectorAll('.init_button');

  const addDataEvent = (event) => {
    const dataEvent = {
      event_type: event.type,
      client_x: event.clientX || 0,
      client_y: event.clientY || 0,
      timestamp: event.timeStamp,
    };

    result.data[`test_box_${activeTest}`].push(dataEvent);
  };

  const initNewTest = () => {
    let nextTest = +activeTest + 1;
    activeTest = nextTest;
    const initButton = document.querySelector('.init_button', nextTest);
    initButton.disabled = false;
  };

  const endButtonClick = () => {
    const testBox = document.querySelector(`.test_box-${activeTest}`);
    const textContainer = testBox.querySelector('#text_container');
    const endText = testBox.querySelector('#end_text');

    testBox.removeChild(textContainer);
    endText.classList.remove('inactive');

    if (activeTest < 7) initNewTest();
  };

  const dropBox = () => {
    const testBox = document.querySelector(`.test_box-${activeTest}`);
    const dragAndDropContainer = testBox.querySelector('#dragAndDropZone');
    const dropZone = testBox.querySelector('#dropZone');
    const draggableBox = testBox.querySelector('#draggableBox');
    const textContainer = testBox.querySelector('#text_container');

    const endButton = testBox.querySelector('.end_button');

    dropZone.appendChild(draggableBox);

    setTimeout(() => {
      alert('Muito bem! Agora, ao final do texto clique no botão "Finalizar"');
      testBox.removeChild(dragAndDropContainer);
      textContainer.classList.remove('inactive');
      textContainer.addEventListener('scroll', addDataEvent);

      endButton.addEventListener('click', endButtonClick);
    }, 300);
  };

  const initButtonClick = (event) => {
    if (username.value === '') return alert('Insira seu nome');
    activeTest = event.target.value;
    const testBox = document.querySelector(`.test_box-${activeTest}`);

    const initButton = testBox.querySelector('.init_button');
    const dragAndDropContainer = testBox.querySelector('#dragAndDropZone');
    const dropZone = testBox.querySelector('#dropZone');

    testBox.removeChild(initButton);
    dragAndDropContainer.classList.remove('inactive');
    dropZone.addEventListener('dragover', (event) => event.preventDefault());
    dropZone.addEventListener('drop', dropBox);

    setTimeout(() => {
      alert(
        `Teste iniciado. Por favor, para a próxima etapa, arraste a caixa vermelha para o quadrado pontilhado.`,
      );
    }, 0);
  };

  const createJsonFile = (jsonContent, userId) => {
    const blob = new Blob([jsonContent], { type: 'application/json' });

    const link = document.createElement('a');
    link.download = `mouse-result_${userId}.json`;
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const saveJSONFile = () => {
    const userId = username.value.split(' ').join('_');
    result.user_id = userId;

    createJsonFile(JSON.stringify(result), userId);
  };

  saveButton.addEventListener('click', saveJSONFile);
  initButtons.forEach((button) => {
    button.addEventListener('click', initButtonClick);
  });

  document.addEventListener('mousedown', addDataEvent);
  document.addEventListener('mousemove', addDataEvent);
  document.addEventListener('mouseup', addDataEvent);
  document.addEventListener('dragstart', addDataEvent);
  document.addEventListener('dragend', addDataEvent);
  document.addEventListener('wheel', addDataEvent);
  document.addEventListener('scroll', addDataEvent);
});
