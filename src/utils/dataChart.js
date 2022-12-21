export const fooChart = (account, year, id) => {
  let arrSum = [];
  let labels = [];

  if (year !== 'за последние 6 месяцев') {
    const arrYear = account.transactions.filter(item => {
      const accMonth = new Date(item.date).getMonth();
      const accYear = new Date(item.date).getFullYear();
      for (let i = 1; i <= 12; i++) {
        if ((accYear + '' === year) &&
      (accMonth === i)) return item.amount;
      }
    });
    arrSum = new Array(12).fill(0);

    arrYear.forEach((item) => {
      const accMonth = new Date(item.date).getMonth();

      for (let i = 1; i <= 12; i++) {
        if (accMonth === i) {
          if (item.from === id) {
            arrSum[i] -= item.amount;
          } else {
            arrSum[i] += item.amount;
          }
        }
      }
    });
    console.log('arrSum: ', arrSum);
    labels = [
      'Янв',
      'Фев',
      'Март',
      'Апр',
      'Май',
      'Июнь',
      'Июль',
      'Авг',
      'Сен',
      'Окт',
      'Ноя',
      'Дек',
    ];
  } else {
    const arrSix = new Array(6).fill(0);
    labels = new Array(6).fill(0);
    for (let i = 0; i < 6; i++) {
      const back = Date.now() - 1000 * 3600 * 24 * 30 * i;

      const yearBack = new Date(back).getFullYear();
      const monthBack = new Date(back).getMonth();
      const monthBackName = new Date(back).toLocaleString('ru', {
        month: 'long'
      });

      account.transactions.forEach((item) => {
        const accMonth = new Date(item.date).getMonth();
        const accYear = new Date(item.date).getFullYear();
        if ((accYear === yearBack) &&
        (accMonth === monthBack)) {
          if (item.from === id) {
            arrSix[i] -= item.amount;
          } else {
            arrSix[i] += item.amount;
          }
        }
      });
      labels[i] = monthBackName[0].toUpperCase() + monthBackName.slice(1);
    }
    labels.reverse();
    arrSum = arrSix.reverse();
  }

  const arr = arrSum;

  const data = {
    arr,
    labels,
    datasets: [
      {
        datasets: '1 Dataset',
        data: arr,
        borderWidth: 4,
        borderColor: '#9c19ca',
        backgroundColor: '#9c19ca',
      },
    ],
  };

  return data;
};
