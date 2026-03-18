const BOTONES = [
  { label: "AC",  action: "clear",   cls: "ac"              },
  { label: "+/−", action: "sign",    cls: "sign"            },
  { label: "%",   action: "percent", cls: "pct"             },
  { label: "÷",   action: "op",      cls: "op",  op: "÷"   },
  { label: "7",   action: "num",     cls: "num", val: "7"   },
  { label: "8",   action: "num",     cls: "num", val: "8"   },
  { label: "9",   action: "num",     cls: "num", val: "9"   },
  { label: "×",   action: "op",      cls: "op",  op: "×"   },
  { label: "4",   action: "num",     cls: "num", val: "4"   },
  { label: "5",   action: "num",     cls: "num", val: "5"   },
  { label: "6",   action: "num",     cls: "num", val: "6"   },
  { label: "−",   action: "op",      cls: "op",  op: "−"   },
  { label: "1",   action: "num",     cls: "num", val: "1"   },
  { label: "2",   action: "num",     cls: "num", val: "2"   },
  { label: "3",   action: "num",     cls: "num", val: "3"   },
  { label: "+",   action: "op",      cls: "op",  op: "+"   },
  { label: "0",   action: "num",     cls: "num", val: "0", span: true },
  { label: ".",   action: "decimal", cls: "dec"             },
  { label: "=",   action: "equals",  cls: "eq"              },
];

function Botones({ onAccion }) {
  return (
    <div className="calc-grid">
      {BOTONES.map((btn, i) => (
        <button
          key={i}
          className={`btn ${btn.cls}${btn.span ? " span2" : ""}`}
          onClick={() => onAccion(btn)}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}

export default Botones;