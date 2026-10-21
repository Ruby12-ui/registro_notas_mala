
package pe.edu.vallegrande.crudregistro.service.impl;

import pe.edu.vallegrande.crudregistro.model.Nota;
import pe.edu.vallegrande.crudregistro.repository.NotaRepository;
import pe.edu.vallegrande.crudregistro.service.NotaService;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class NotaServiceImpl implements NotaService {

    private final NotaRepository notaRepository;

    public NotaServiceImpl(NotaRepository notaRepository) {
        this.notaRepository = notaRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Nota> listarTodas() {
        return notaRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Nota buscarPorId(Integer id) {
        return notaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No se encontró la nota con ID: " + id
                ));
    }

    @Override
    public Nota guardar(Nota nota) {
        // El identificador lo genera SQL Server.
        nota.setId(null);

        if (nota.getFechaEvaluacion() == null) {
            nota.setFechaEvaluacion(LocalDate.now());
        }

        return notaRepository.save(nota);
    }

    @Override
    public Nota actualizar(Integer id, Nota datos) {
        Nota notaExistente = buscarPorId(id);

        notaExistente.setEstudianteId(datos.getEstudianteId());
        notaExistente.setAsignacionId(datos.getAsignacionId());
        notaExistente.setPeriodoAcademicoId(
                datos.getPeriodoAcademicoId()
        );
        notaExistente.setNombreEvaluacion(
                datos.getNombreEvaluacion()
        );
        notaExistente.setNota(datos.getNota());
        notaExistente.setFechaEvaluacion(
                datos.getFechaEvaluacion()
        );
        notaExistente.setObservaciones(datos.getObservaciones());

        return notaRepository.save(notaExistente);
    }

    @Override
    public void eliminar(Integer id) {
        Nota nota = buscarPorId(id);
        notaRepository.delete(nota);
    }
}
