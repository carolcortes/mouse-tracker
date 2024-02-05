document.addEventListener('DOMContentLoaded', function () {
  const username = document.querySelector('.user');
  let result = { user_id: '', data: [] };

  // buttons
  const saveButton = document.querySelector('.save_button');
  const initButton = document.querySelector('.init_button');
  const endButton = document.querySelector('.end_button');

  // elements
  const testContainer = document.querySelector('.test_box');
  const draggableBox = document.querySelector('#draggableBox');
  const dropZone = document.querySelector('#dropZone');
  const dragZone = document.querySelector('#dragZone');
  const textContainer = document.querySelector('#text_container');
  const endText = document.querySelector('#end_text');

  const addDataEvent = (event) => {
    data = {
      event_type: event.type,
      client_x: event.clientX || 0,
      client_y: event.clientY || 0,
      timestamp: event.timeStamp,
    };
    result.data.push(data);
  };

  const initButtonClick = () => {
    if (username.value === '') return alert('Insira seu nome');
    testContainer.removeChild(initButton);
    dragZone.classList.remove('inactive');
    dropZone.classList.remove('inactive');

    alert(
      `Teste iniciado. Por favor, para a próxima etapa, arraste a caixa vermelha para o quadrado pontilhado.`,
    );
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

  const dropBox = () => {
    dropZone.appendChild(draggableBox);

    setTimeout(() => {
      alert('Muito bem! Agora, ao final do texto clique no botão "Finalizar"');
      testContainer.removeChild(dragZone);
      testContainer.removeChild(dropZone);
      textContainer.classList.remove('inactive');

      endButton.addEventListener('click', endButtonClick);
    }, 300);
  };

  const endButtonClick = () => {
    testContainer.removeChild(textContainer);
    endText.classList.remove('inactive');
  };

  document.addEventListener('mousedown', addDataEvent);
  document.addEventListener('mousemove', addDataEvent);
  document.addEventListener('mouseup', addDataEvent);
  document.addEventListener('dragstart', addDataEvent);
  document.addEventListener('dragend', addDataEvent);
  document.addEventListener('wheel', addDataEvent);
  document.addEventListener('scroll', addDataEvent);
  textContainer.addEventListener('scroll', addDataEvent);

  dropZone.addEventListener('dragover', (event) => event.preventDefault());
  dropZone.addEventListener('drop', dropBox);
  saveButton.addEventListener('click', saveJSONFile);
  initButton.addEventListener('click', initButtonClick);
});
