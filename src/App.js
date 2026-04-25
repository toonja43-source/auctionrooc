import React, { useState } from "react";

export default function App() {
  const [white, setWhite] = useState("");
  const [red, setRed] = useState("");
  const [members, setMembers] = useState(["", "", "", "", ""]);

  const numWhite = Number(white) || 0;
  const numRed = Number(red) || 0;

  // คำนวณจำนวนต่อคน
  const whitePerPerson =
    members.length > 0 ? Math.floor(numWhite / members.length) : 0;
  const redPerPerson =
    members.length > 0 ? Math.floor(numRed / members.length) : 0;

  // ฟังก์ชันหาตำแหน่ง หน้า/ชิ้น (1 หน้ามี 4 ชิ้น)
  const getPos = (index) => {
    if (index < 0) return "-";
    const page = Math.floor(index / 4) + 1;
    const slot = (index % 4) + 1;
    return `หน้า ${page} ชิ้นที่ ${slot}`;
  };

  const updateMember = (index, name) => {
    const newArr = [...members];
    newArr[index] = name;
    setMembers(newArr);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>✦ ROOC Feather Divider (Sequential) ✦</div>

      {/* ส่วนกรอกข้อมูล */}
      <div style={styles.card}>
        <div style={styles.inputGroup}>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>จำนวนขนขาว</label>
            <input
              type="number"
              placeholder="0"
              value={white}
              onChange={(e) => setWhite(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>จำนวนขนแดง</label>
            <input
              type="number"
              placeholder="0"
              value={red}
              onChange={(e) => setRed(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
          <button
            onClick={() => setMembers([...members, ""])}
            style={styles.btnPlus}
          >
            + เพิ่มคน
          </button>
          <button
            onClick={() => setMembers(members.slice(0, -1))}
            style={styles.btnMinus}
          >
            - ลดคน
          </button>
        </div>
      </div>

      {/* ส่วนกรอกชื่อ */}
      <div style={styles.card}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
          }}
        >
          {members.map((name, i) => (
            <input
              key={i}
              value={name}
              onChange={(e) => updateMember(i, e.target.value)}
              placeholder={`ชื่อคนที่ ${i + 1}`}
              style={styles.inputMember}
            />
          ))}
        </div>
      </div>

      {/* ตารางแสดงผลแยกประเภท */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>ชื่อสมาชิก</th>
              <th
                style={{
                  ...styles.th,
                  backgroundColor: "#fdf2f2",
                  color: "#991b1b",
                }}
              >
                ขนขาว ({whitePerPerson})
              </th>
              <th
                style={{
                  ...styles.th,
                  backgroundColor: "#fef2f2",
                  color: "#b91c1c",
                }}
              >
                ขนแดง ({redPerPerson})
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((name, i) => {
              // Logic ขนขาว: เริ่มจาก 0
              const wStart = i * whitePerPerson;
              const wEnd = wStart + whitePerPerson - 1;

              // Logic ขนแดง: เริ่มต่อจากขนขาวทั้งหมด (numWhite)
              const rStart = numWhite + i * redPerPerson;
              const rEnd = rStart + redPerPerson - 1;

              return (
                <tr key={i} style={styles.tr}>
                  <td style={styles.td}>
                    <strong>{name || `-`}</strong>
                  </td>
                  <td style={styles.tdSmall}>
                    <div style={{ color: "#1e40af" }}>{getPos(wStart)}</div>
                    <div style={{ fontSize: "10px", color: "#64748b" }}>
                      ถึง {getPos(wEnd)}
                    </div>
                  </td>
                  <td style={styles.tdSmall}>
                    <div style={{ color: "#b91c1c" }}>{getPos(rStart)}</div>
                    <div style={{ fontSize: "10px", color: "#64748b" }}>
                      ถึง {getPos(rEnd)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={styles.footer}>
        * ขนแดงจะเริ่มนับต่อจากตำแหน่งสุดท้ายของขนขาวทั้งหมดทันที
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "15px",
    maxWidth: "500px",
    margin: "auto",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    fontFamily: "sans-serif",
  },
  header: {
    background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    color: "white",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "15px",
    fontSize: "16px",
  },
  card: {
    backgroundColor: "white",
    padding: "12px",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    marginBottom: "10px",
  },
  inputGroup: { display: "flex", gap: "10px" },
  label: {
    display: "block",
    fontSize: "11px",
    color: "#64748b",
    marginBottom: "4px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    boxSizing: "border-box",
    fontSize: "16px",
  },
  inputMember: {
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #f1f5f9",
    backgroundColor: "#f8fafc",
    boxSizing: "border-box",
    fontSize: "13px",
  },
  btnPlus: {
    flex: 1,
    backgroundColor: "#059669",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px",
    cursor: "pointer",
    fontSize: "12px",
  },
  btnMinus: {
    flex: 1,
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px",
    cursor: "pointer",
    fontSize: "12px",
  },
  tableContainer: {
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "white",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  thead: { backgroundColor: "#f8fafc" },
  th: {
    padding: "10px",
    fontSize: "11px",
    textAlign: "left",
    borderBottom: "2px solid #e2e8f0",
  },
  td: { padding: "10px", fontSize: "13px", borderBottom: "1px solid #f1f5f9" },
  tdSmall: {
    padding: "10px",
    fontSize: "12px",
    borderBottom: "1px solid #f1f5f9",
    lineHeight: "1.4",
  },
  footer: {
    marginTop: "10px",
    fontSize: "10px",
    color: "#94a3b8",
    textAlign: "center",
  },
};
