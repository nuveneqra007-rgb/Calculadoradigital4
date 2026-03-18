import { useState, useCallback } from "react";
import Pantalla from "./Pantalla";
import Botones from "./Botones";

function fmt(n) {
  const s = parseFloat(n.toPrecision(10)).toString();
  return s.length > 12 ? parseFloat(n.toPrecision(6)).toString() : s;
}

function Calculadora() {
  const [current, setCurrent] = useState("0");
  const [prev,    setPrev]    = useState(null);
  const [op,      setOp]      = useState(null);
  const [expr,    setExpr]    = useState("");
  const [fresh,   setFresh]   = useState(false);
  const [justEq,  setJustEq]  = useState(false);

  const calcular = useCallback((a, b, operador) => {
    if (operador === "÷") return a / b;
    if (operador === "×") return a * b;
    if (operador === "−") return a - b;
    return a + b;
  }, []);

  const handleAccion = useCallback(({ action, val, op: newOp }) => {

    if (action === "clear") {
      setCurrent("0");
      setPrev(null);
      setOp(null);
      setExpr("");
      setFresh(false);
      setJustEq(false);
      return;
    }

    if (action === "num") {
      setCurrent(prev =>
        justEq              ? val :
        (fresh || prev === "0") ? val :
        prev.length < 12    ? prev + val : prev
      );
      setFresh(false);
      setJustEq(false);
      return;
    }

    if (action === "decimal") {
      setCurrent(prev => {
        if (fresh || justEq) return "0.";
        return prev.includes(".") ? prev : prev + ".";
      });
      setFresh(false);
      setJustEq(false);
      return;
    }

    if (action === "sign") {
      setCurrent(prev => {
        const n = parseFloat(prev);
        return n !== 0 ? fmt(-n) : prev;
      });
      return;
    }

    if (action === "percent") {
      setCurrent(prev => fmt(parseFloat(prev) / 100));
      return;
    }

    if (action === "op") {
      if (op && !fresh && !justEq) {
        const resultado = fmt(calcular(parseFloat(prev), parseFloat(current), op));
        setCurrent(resultado);
        setPrev(resultado);
      } else {
        setPrev(current);
      }
      setOp(newOp);
      setFresh(true);
      setJustEq(false);
      setExpr(current + " " + newOp);
      return;
    }

    if (action === "equals") {
      if (!op || !prev) return;
      const resultado = fmt(calcular(parseFloat(prev), parseFloat(current), op));
      setExpr(prev + " " + op + " " + current + " =");
      setCurrent(resultado);
      setOp(null);
      setPrev(null);
      setFresh(false);
      setJustEq(true);
    }

  }, [current, prev, op, fresh, justEq, calcular]);

  return (
    <div className="calc-wrap">
      <div className="calc-header">
        <span className="calc-label">Calculadora</span>
        <div className="calc-dots">
          <span className="calc-dot"></span>
          <span className="calc-dot"></span>
          <span className="calc-dot"></span>
        </div>
      </div>
      <Pantalla expresion={expr} valor={current} />
      <div className="calc-divider"></div>
      <Botones onAccion={handleAccion} />
    </div>
  );
}

export default Calculadora;