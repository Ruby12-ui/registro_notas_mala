
package pe.edu.vallegrande.crudregistro.rest;

import pe.edu.vallegrande.crudregistro.model.Asistencia;
import pe.edu.vallegrande.crudregistro.service.AsistenciaService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asistencias")
@CrossOrigin(origins = "http://localhost:4200")
public class AsistenciaRest {

    private final AsistenciaService asistenciaService;

    public AsistenciaRest(AsistenciaService asistenciaService) {
        this.asistenciaService = asistenciaService;
    }

    @GetMapping
    public ResponseEntity<List<Asistencia>> listarTodas() {
        return ResponseEntity.ok(
                asistenciaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Asistencia> buscarPorId(
            @PathVariable Integer id) {
        return ResponseEntity.ok(
                asistenciaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Asistencia> guardar(
            @RequestBody Asistencia asistencia) {
        Asistencia nueva =
                asistenciaService.guardar(asistencia);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(nueva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Asistencia> actualizar(
            @PathVariable Integer id,
            @RequestBody Asistencia asistencia) {
        return ResponseEntity.ok(
                asistenciaService.actualizar(id, asistencia));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Integer id) {
        asistenciaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
