
/**
 * INCIDENT CONTROLLER - PRODUCTION SAMPLE
 * Demonstrates Service-Controller pattern & error handling.
 */

// const IncidentService = require('../services/incident.service');
// const { validateIncident } = require('../utils/validation');

/**
 * @desc Create new incident with AI Triage
 * @route POST /api/v1/incidents
 * @access Private (Dispatcher/Responder)
 */
exports.createIncident = async (req, res, next) => {
  try {
    // 1. Input Validation
    const { error } = validateIncident(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    // 2. Prepare Incident Data
    const incidentData = {
      ...req.body,
      reportedBy: req.user.id,
      status: 'REPORTED'
    };

    // 3. Save to DB (Service Layer)
    const incident = await IncidentService.create(incidentData);

    // 4. Trigger Async AI Triage (Event Driven)
    // We don't wait for AI to finish to respond to the user for better UX
    // But we use WebSockets to push the update when AI is done
    req.app.get('eventEmitter').emit('incident_created', incident);

    res.status(201).json({
      success: true,
      data: incident
    });
  } catch (err) {
    next(err); // Centralized error handler
  }
};

/**
 * @desc Update Incident Status (RBAC Protected)
 */
exports.updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const incident = await IncidentService.update(id, { status });
    
    // Broadcast real-time update to all connected dispatchers
    req.io.emit('incident_updated', incident);

    res.status(200).json({ success: true, data: incident });
  } catch (err) {
    next(err);
  }
};
