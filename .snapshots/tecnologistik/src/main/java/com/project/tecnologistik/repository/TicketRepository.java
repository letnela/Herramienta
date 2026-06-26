package com.project.tecnologistik.repository;

import com.project.tecnologistik.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface TicketRepository extends JpaRepository<Ticket, UUID> {

    long countByEstado(String estado);

    @Query("""
        SELECT t.categoria.nombre, COUNT(t)
        FROM Ticket t
        GROUP BY t.categoria.nombre
    """)
    List<Object[]> ticketsPorCategoria();

    @Query("""
        SELECT t.estado, COUNT(t)
        FROM Ticket t
        GROUP BY t.estado
    """)
    List<Object[]> ticketsPorEstado();

    @Query("""
        SELECT t.prioridad, COUNT(t)
        FROM Ticket t
        GROUP BY t.prioridad
    """)
    List<Object[]> ticketsPorPrioridad();
}