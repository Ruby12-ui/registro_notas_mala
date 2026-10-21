
package pe.edu.vallegrande.crudregistro.service.impl;

import pe.edu.vallegrande.crudregistro.model.Asistencia;
import pe.edu.vallegrande.crudregistro.repository.AsistenciaRepository;
import pe.edu.vallegrande.crudregistro.service.AsistenciaService;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class AsistenciaServiceImpl implements AsistenciaService {

    private final AsistenciaRepository asistenciaRepository;

    public AsistenciaServiceImpl(
            AsistenciaRepository asistenciaRepository) {
        this.asistenciaRepository = asistenciaRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Asistencia> listarTodas() {
        return asistenciaRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Asistencia buscarPorId(Integer id) {
        return asistenciaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No se encontró la asistencia con ID: " + id
                ));
    }

    @Override
    public Asistencia guardar(Asistencia asistencia) {
        asistencia.setId(null);

        if (asistencia.getFechaAsistencia() == null) {
            asistencia.setFechaAsistencia(LocalDate.now());
        }

        if (asistencia.getEstado() == null
                || asistencia.getEstado().isBlank()) {
            asistencia.setEstado("PRESENTE");
        }

        return asistenciaRepository.save(asistencia);
    }

    @Override
    public Asistencia actualizar(
            Integer id, Asistencia datos) {
        Asistencia existente = buscarPorId(id);

        existente.setEstudianteId(datos.getEstudianteId());
        existente.setPeriodoAcademicoId(
                datos.getPeriodoAcademicoId());
        existente.setFechaAsistencia(
                datos.getFechaAsistencia());
        existente.setEstado(datos.getEstado());
        existente.setObservaciones(datos.getObservaciones());

        return asistenciaRepository.save(existente);
    }

    @Override
    public void eliminar(Integer id) {
        Asistencia asistencia = buscarPorId(id);
        asistenciaRepository.delete(asistencia);
    }
}
