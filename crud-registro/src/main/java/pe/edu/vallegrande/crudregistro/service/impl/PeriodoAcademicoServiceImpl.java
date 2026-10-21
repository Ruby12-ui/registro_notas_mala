
package pe.edu.vallegrande.crudregistro.service.impl;

import pe.edu.vallegrande.crudregistro.model.PeriodoAcademico;
import pe.edu.vallegrande.crudregistro.repository.PeriodoAcademicoRepository;
import pe.edu.vallegrande.crudregistro.service.PeriodoAcademicoService;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
public class PeriodoAcademicoServiceImpl
        implements PeriodoAcademicoService {

    private final PeriodoAcademicoRepository repository;

    public PeriodoAcademicoServiceImpl(
            PeriodoAcademicoRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PeriodoAcademico> listar() {
        return repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public PeriodoAcademico buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No se encontró el periodo académico con ID: " + id
                ));
    }

    @Override
    public PeriodoAcademico registrar(PeriodoAcademico periodo) {
        validarFechas(periodo);
        periodo.setId(null);

        return repository.save(periodo);
    }

    @Override
    public PeriodoAcademico actualizar(
            Integer id,
            PeriodoAcademico datos) {

        PeriodoAcademico periodo = buscarPorId(id);

        validarFechas(datos);

        periodo.setNombre(datos.getNombre());
        periodo.setFechaInicio(datos.getFechaInicio());
        periodo.setFechaFin(datos.getFechaFin());
        periodo.setEstado(datos.getEstado());

        return repository.save(periodo);
    }

    @Override
    public void eliminar(Integer id) {
        PeriodoAcademico periodo = buscarPorId(id);
        repository.delete(periodo);
    }

    private void validarFechas(PeriodoAcademico periodo) {
        if (periodo.getFechaInicio() != null
                && periodo.getFechaFin() != null
                && periodo.getFechaInicio()
                        .isAfter(periodo.getFechaFin())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "La fecha de inicio no puede ser posterior a la fecha de fin"
            );
        }
    }
}
