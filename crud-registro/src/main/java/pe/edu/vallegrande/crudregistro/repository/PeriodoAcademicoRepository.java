
package pe.edu.vallegrande.crudregistro.repository;

import pe.edu.vallegrande.crudregistro.model.PeriodoAcademico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeriodoAcademicoRepository
        extends JpaRepository<PeriodoAcademico, Integer> {
}
