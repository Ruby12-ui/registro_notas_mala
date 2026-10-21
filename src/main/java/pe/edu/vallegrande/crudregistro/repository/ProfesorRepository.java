package pe.edu.vallegrande.crudregistro.repository;

import pe.edu.vallegrande.crudregistro.model.Profesor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfesorRepository
        extends JpaRepository<Profesor, Integer> {
}
