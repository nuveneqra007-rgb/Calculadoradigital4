function Pantalla({ expresion, valor }) {
  return (
    <div className="calc-screen">
      <div className="calc-screen-top">
        <span className="calc-mode">STD</span>
        <span className="calc-expr">{expresion}</span>
      </div>
      <div className="calc-screen-bottom">
        <span className="calc-result">{valor}</span>
      </div>
    </div>
  );
}

export default Pantalla;