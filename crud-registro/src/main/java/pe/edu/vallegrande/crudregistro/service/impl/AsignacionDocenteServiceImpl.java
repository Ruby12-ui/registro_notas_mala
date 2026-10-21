
package pe.edu.vallegrande.crudregistro.service.impl;

import pe.edu.vallegrande.crudregistro.model.AsignacionDocente;
import pe.edu.vallegrande.crudregistro.repository.AsignacionDocenteRepository;
import pe.edu.vallegrande.crudregistro.service.AsignacionDocenteService;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
public class AsignacionDocenteServiceImpl
        implements AsignacionDocenteService {

    private final AsignacionDocenteRepository repository;

    public AsignacionDocenteServiceImpl(
            AsignacionDocenteRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<AsignacionDocente> listarTodas() {
        return repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public AsignacionDocente buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No se encontró la asignación docente con ID: "
                                + id
                ));
    }

    @Override
    public AsignacionDocente guardar(
            AsignacionDocente asignacion) {
        asignacion.setId(null);
        return repository.save(asignacion);
    }

    @Override
    public AsignacionDocente actualizar(
            Integer id, AsignacionDocente datos) {

        AsignacionDocente existente = buscarPorId(id);

        existente.setProfesorId(datos.getProfesorId());
        existente.setCursoId(datos.getCursoId());
        existente.setGradoId(datos.getGradoId());
        existente.setSeccionId(datos.getSeccionId());
        existente.setPeriodoAcademicoId(
                datos.getPeriodoAcademicoId());

        return repository.save(existente);
    }

    @Override
    public void eliminar(Integer id) {
        AsignacionDocente asignacion = buscarPorId(id);
        repository.delete(asignacion);
    }
}
