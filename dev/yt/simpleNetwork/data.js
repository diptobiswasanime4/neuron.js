const data = Array.from({ length: 100 }, () => {
  const input1 = Math.floor(Math.random() * 15) - 7;
  const input2 = Math.floor(Math.random() * 15) - 7;
  return {
    input: [input1, input2],
    output: [input1 + input2, input1 - input2],
  };
});

export default data;
