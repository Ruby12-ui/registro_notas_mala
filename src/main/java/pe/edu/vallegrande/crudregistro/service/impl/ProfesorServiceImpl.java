package pe.edu.vallegrande.crudregistro.service.impl;

import pe.edu.vallegrande.crudregistro.model.Profesor;
import pe.edu.vallegrande.crudregistro.repository.ProfesorRepository;
import pe.edu.vallegrande.crudregistro.service.ProfesorService;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfesorServiceImpl implements ProfesorService {

    private final ProfesorRepository profesorRepository;

    public ProfesorServiceImpl(
            ProfesorRepository profesorRepository
    ) {
        this.profesorRepository = profesorRepository;
    }

    @Override
    public List<Profesor> listarTodos() {
        return profesorRepository.findAll();
    }

    @Override
    public Optional<Profesor> buscarPorId(Integer id) {
        return profesorRepository.findById(id);
    }

    @Override
    public Profesor guardar(Profesor profesor) {
        profesor.setId(null);

        if (profesor.getEstado() == null
                || profesor.getEstado().isBlank()) {
            profesor.setEstado("ACTIVO");
        }

        return profesorRepository.save(profesor);
    }

    @Override
    public Optional<Profesor> actualizar(
            Integer id,
            Profesor datos
    ) {
        return profesorRepository.findById(id)
                .map(profesor -> {
                    profesor.setTipoDocumento(
                            datos.getTipoDocumento()
                    );
                    profesor.setNumeroDocumento(
                            datos.getNumeroDocumento()
                    );
                    profesor.setNombres(datos.getNombres());
                    profesor.setApellidos(datos.getApellidos());
                    profesor.setEspecialidad(
                            datos.getEspecialidad()
                    );
                    profesor.setTelefono(datos.getTelefono());
                    profesor.setEmail(datos.getEmail());
                    profesor.setFechaContratacion(
                            datos.getFechaContratacion()
                    );
                    profesor.setEstado(datos.getEstado());

                    return profesorRepository.save(profesor);
                });
    }

    @Override
    public boolean eliminar(Integer id) {
        if (!profesorRepository.existsById(id)) {
            return false;
        }

        profesorRepository.deleteById(id);
        return true;
    }
}
