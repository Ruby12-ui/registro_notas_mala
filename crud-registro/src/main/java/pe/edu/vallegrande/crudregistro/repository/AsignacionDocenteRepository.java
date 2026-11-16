
package pe.edu.vallegrande.crudregistro.repository;

import pe.edu.vallegrande.crudregistro.model.AsignacionDocente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AsignacionDocenteRepository
        extends JpaRepository<AsignacionDocente, Integer> {
}
