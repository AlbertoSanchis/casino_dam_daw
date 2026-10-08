export const state = {
  sueldo:
    localStorage.getItem("sueldo") !== null
      ? Number(localStorage.getItem("sueldo"))
      : 100,
  apuesta: 0,
  valorSelecionado: "",
  numeroUsuario: 0,
  numeroMaquina: 0,
};

export const WinOption = Object.freeze({
  USUWIN: "USUWIN",
  CASWIN: "CASWIN",
});
