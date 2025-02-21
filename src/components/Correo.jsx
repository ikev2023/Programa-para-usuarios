import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Correo = () => {
    const [email, setEmail] = useState("");
    const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [buscado, setBuscado] = useState(false);
    const tableRef = useRef();

    useEffect(() => {
        fetch("/datos.json")
            .then(response => response.json())
            .then(data => setUsuarios(data))
            .catch(error => console.error("Error al cargar el JSON:", error));
    }, []);

    const buscarUsuario = () => {
        if (!email.trim()) {
            alert("Por favor, introduce un correo antes de buscar.");
            return;
        }

        if (usuarios.length === 0) {
            alert("La base de datos no se ha cargado correctamente.");
            return;
        }

        const usuario = usuarios.find(u => u["Correo electronico"] === email);
        setUsuarioEncontrado(usuario || null);
        setBuscado(true);
    };

    const imprimirTabla = () => {
        if (!tableRef.current) return;
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Imprimir Tabla</title>');
        printWindow.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">');
        printWindow.document.write(`
            <style>
                .no-print { display: none; }
                .table-bordered th {
                    background-color: #343a40 !important;
                    color: white !important;
                }
                .table-bordered td {
                    background-color: #f8f9fa !important;
                }
                .table-bordered tr:nth-child(even) td {
                    background-color: #e9ecef !important;
                }
                th, td {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
            </style>
        `);
        printWindow.document.write('</head><body>');
        printWindow.document.write(tableRef.current.outerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };
    

    const guardarComoPDF = () => {
        if (!usuarioEncontrado) return;
        const doc = new jsPDF();
        doc.text("Detalles del Usuario", 14, 10);
        doc.autoTable({
            startY: 20,
            head: [["Campo", "Valor"]],
            body: [
                ["Correo", usuarioEncontrado["Correo electronico"]],
                ["Nombre", usuarioEncontrado["Nombre"]],
                ["Grado", usuarioEncontrado["Grado"]],
                ["Usuario", usuarioEncontrado["Usuario"]],
                ["Contraseña", usuarioEncontrado["Contraseña"]]
            ]
        });
        doc.save(`${usuarioEncontrado["Correo electronico"]}.pdf`);
    };

    return (
        <div className="container">
            <div className="d-flex flex-column align-items-center p-3">
                <label htmlFor="exampleFormControlInput1" className="h2 text-center mb-2">
                    Introduce tu correo Institucional
                </label>
                <input
                    type="email"
                    className="form-control w-100 w-md-50"
                    value={email}
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn mt-2" onClick={buscarUsuario}>
                    Buscar
                </button>
            </div>

            {usuarioEncontrado && (
                <div className="table-responsive" ref={tableRef}>
                    <table className="table table-bordered">
                        <tbody>
                            <tr><th className="table">Correo</th><td>{usuarioEncontrado["Correo electronico"]}</td></tr>
                            <tr><th className="table">Nombre</th><td>{usuarioEncontrado["Nombre"]}</td></tr>
                            <tr><th className="table">Grado</th><td>{usuarioEncontrado["Grado"]}</td></tr>
                            <tr><th className="table">Usuario</th><td>{usuarioEncontrado["Usuario"]}</td></tr>
                            <tr><th className="table">Contraseña</th><td>{usuarioEncontrado["Contraseña"]}</td></tr>
                        </tbody>
                    </table>
                    <div class="d-flex flex-column align-items-center">
                        <div class="">
                            <button className="btn  m-2 no-print" onClick={imprimirTabla}>Imprimir</button>
                            <button className="btn  m-2 no-print" onClick={guardarComoPDF}>Guardar como PDF</button>
                        </div>
                    </div>
                </div>
            )}

            {buscado && !usuarioEncontrado && (
                <p className="text-danger mt-3 text-center">No se encontró un usuario con este correo.</p>
            )}
        </div>
    );
};

export default Correo;
