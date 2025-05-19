export type ThesisTaskStatus = 'Pendiente' | 'En Progreso' | 'Completada';

export interface ThesisTask {
  id: string;
  tarea: string; // Task name
  especificaciones: string;
  recursos: string;
  cronograma: string;
  evaluacionProceso: string;
  planInicial: string;
  metodologias: string;
  formatos: string;
  guiasRedaccion: string;
  evaluacionTesis: string;
  presentacion: string;
  status: ThesisTaskStatus;
}

export interface DocumentFile {
  id: string;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  taskAssociation?: string; // Optional: associate with a task
}
