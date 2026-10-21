
package pe.edu.vallegrande.crudregistro.service.impl;

import pe.edu.vallegrande.crudregistro.model.Estudiante;
import pe.edu.vallegrande.crudregistro.repository.EstudianteRepository;
import pe.edu.vallegrande.crudregistro.service.EstudianteService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EstudianteServiceImpl implements EstudianteService {

    private final EstudianteRepository estudianteRepository;

    public EstudianteServiceImpl(EstudianteRepository estudianteRepository) {
        this.estudianteRepository = estudianteRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Estudiante> listarTodos() {
        return estudianteRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Estudiante> buscarPorId(Integer id) {
        return estudianteRepository.findById(id);
    }

    @Override
    public Estudiante guardar(Estudiante estudiante) {
        estudiante.setId(null);

        if (estudiante.getFechaMatricula() == null) {
            estudiante.setFechaMatricula(LocalDate.now());
        }

        if (estudiante.getEstado() == null || estudiante.getEstado().isBlank()) {
            estudiante.setEstado("ACTIVO");
        }

        return estudianteRepository.save(estudiante);
    }

    @Override
    public Optional<Estudiante> actualizar(Integer id, Estudiante datos) {
        return estudianteRepository.findById(id).map(estudiante -> {
            estudiante.setCodigoEstudiante(datos.getCodigoEstudiante());
            estudiante.setDni(datos.getDni());
            estudiante.setNombres(datos.getNombres());
            estudiante.setApellidos(datos.getApellidos());
            estudiante.setFechaNacimiento(datos.getFechaNacimiento());
            estudiante.setGenero(datos.getGenero());
            estudiante.setDireccion(datos.getDireccion());
            estudiante.setFotoUrl(datos.getFotoUrl());
            estudiante.setGradoId(datos.getGradoId());
            estudiante.setSeccionId(datos.getSeccionId());

            if (datos.getFechaMatricula() != null) {
                estudiante.setFechaMatricula(datos.getFechaMatricula());
            }

            if (datos.getEstado() != null && !datos.getEstado().isBlank()) {
                estudiante.setEstado(datos.getEstado());
            }

            return estudianteRepository.save(estudiante);
        });
    }

    @Override
    public boolean eliminar(Integer id) {
        if (!estudianteRepository.existsById(id)) {
            return false;
        }

        estudianteRepository.deleteById(id);
        return true;
    }
}
