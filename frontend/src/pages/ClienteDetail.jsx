import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { getHistory, getById, getBalance, deleteUserHistory } from "../api/users";
import convertDate from "../libs/ConvertDate";
import socket from "../socket";
import "../styles/ClienteDetail.css";
import { MoneyIcon } from "../components/icons/MoneyIcon";
import CrearPaymentModal from "../components/modals/CrearPaymentModal";

function ClienteDetail() {
  const { id } = useParams();
  const [userHistory, setUserHistory] = useState([]);
  const [userBalance, setUserBalance] = useState({ balance: 0 });
  const [user, setUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  // Fetch User History with Pagination
  const fetchHistory = useCallback(async () => {
    try {
      const response = await getHistory(id, currentPage, itemsPerPage);
      setUserHistory(response.data.history);
    } catch (err) {
      console.error(err);
      setError("Error fetching history");
    } finally {
      setLoading(false);
    }
  }, [id, currentPage, itemsPerPage]);


  const handleReload = () => setReload((prev) => !prev)

  useEffect(() => {
    socket.on("balanceUpdated", (data) => {
      if (data.userId === parseInt(id)) {
        setUserBalance(data.balance)
      }
    })

    socket.on("historyUpdated", (data) => {
      if (data.userId === parseInt(id)) {
        setUserHistory(data.history);
      }
    });


  })

  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        const response = await getBalance(id);
        setUserBalance(response.data);

        if (response.data.balance === 0) {
          await deleteUserHistory(id);
          setUserHistory([]);
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching balance");
      }
    };
    fetchUserBalance();
  }, [id, reload]);

  // Fetch User Details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getById(id);
        setUser(response.data);
      } catch (err) {
        console.error(err);
        setError("Error fetching user data");
      }
    };
    fetchUser();
  }, [id]);

  // Load User History on Page Change
  useEffect(() => {
    setLoading(true);
    fetchHistory();
  }, [fetchHistory, currentPage, reload]);

  // Suscribirse a eventos del servidor usando Socket.IO
  useEffect(() => {
    // Escuchar actualizaciones del balance
    socket.on("balanceUpdated", (data) => {
      if (data.userId === parseInt(id)) {
        setUserBalance(data.balance);
      }
    });

    // Escuchar actualizaciones del historial
    socket.on("historyUpdated", (data) => {
      if (data.userId === parseInt(id)) {
        setUserHistory((prevHistory) => [...data.history]);
      }
    });

    // Limpiar suscripciones al desmontar el componente
    return () => {
      socket.off("balanceUpdated");
      socket.off("historyUpdated");
    };
  }, [id]);

  const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setCurrentPage((prevPage) => prevPage - 1);

  const handleOpenModal = (userId) => {
    setSelectedUserId(userId);
  };
  const handleCloseModal = () => {
    setSelectedUserId(null);
    handleReload()
  }

  // Calculate items to show for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentHistoryPage = userHistory.slice(startIndex, endIndex);

  // Ordenar el historial por fecha y hora (más reciente primero)
  const sortedHistory = [...userHistory].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA; // Ordena de más reciente a más antiguo
  });

  return (
    <div className="clientes-detail-page">
      <div className="clientes-detail-header">
        <h1>Historial de Fiados - {user.name}</h1>
        <button className="btn-add-payment" onClick={() => handleOpenModal(user.id)}>
          <MoneyIcon />
          Nuevo Abono
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : sortedHistory.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th className="type-column">Tipo</th>
              <th className="date-column">Fecha</th>
              <th className="amount-column">Monto</th>
              <th className="description-column">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {currentHistoryPage.map((purchase) => (
              <tr key={purchase.id}>
                <td
                  style={{
                    color: purchase.type === "payment" ? "red" : "green",
                  }}
                >
                  {purchase.type === "payment" ? "Abono" : "Fiado"}
                </td>
                <td>{convertDate(purchase.createdAt)}</td>
                <td>${purchase.amount}</td>
                <td>{purchase.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay historial disponible.</p>
      )}

      <h2 className="bg-success fs-4 text text-white fw-bold p-1">
        Saldo Total: $ {userBalance.balance}
      </h2>

      {selectedUserId && <CrearPaymentModal userId={selectedUserId} onClose={handleCloseModal} />}

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}

export default ClienteDetail;
