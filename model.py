from openxc import vehicle
from openxc import measurements
from openxc.sources import network

class Model():

    measurements = {
        "accelerator_pedal_position": measurements.AcceleratorPedalPosition,
        "fuel_level": measurements.FuelLevel,
        "vehicle_speed": measurements.VehicleSpeed,
        "engine_speed": measurements.EngineSpeed,
        "fuel_consumed_since_restart": measurements.FuelConsumed,
        "latitude": measurements.Latitude,
        "longitude": measurements.Longitude,
        "odometer": measurements.Odometer,
        "steering_wheel_angle": measurements.SteeringWheelAngle,
        "torque_at_transmission": measurements.TorqueAtTransmission,
        "lateral_acceleration": measurements.LateralAcceleration,
        "longitudinal_acceleration": measurements.LongitudinalAcceleration,
        "brake_pedal_status": measurements.BrakePedalStatus,
        "headlamp_status": measurements.HeadlampStatus,
        "high_beam_status": measurements.HighBeamStatus,
        "parking_brake_status": measurements.ParkingBrakeStatus,
        "windshield_wiper_status": measurements.WindshieldWiperStatus,
        "ignition_status": measurements.IgnitionStatus,
        "transmission_gear_position": measurements.TransmissionGearPosition,
        "turn_signal_status": measurements.TurnSignalStatus
        #"button_event": measurements.ButtonEvent,
        #"door_status": measurements.DoorStatus
    }

    def __init__(self):
        self.vehicle = vehicle.Vehicle()
        self.vehicle.add_source(network.NetworkDataSource())

    def format(self,measurement):
        if measurement is None:
            return "None"
        elif isinstance(measurement,measurements.NumericMeasurement):
            return {"value": measurement.value.num, "unit": str(measurement.value.unit)}
        elif isinstance(measurement,measurements.EventedMeasurement):
            return str(measurement.value)
        else:
            return str(measurement.value)

    def get(self,name=None):
        if name is None:
            retval = {}
            for name in Model.measurements:
                #print name,self.format(self.vehicle.get(Model.measurements[name]))
                retval[name] = self.format(self.vehicle.get(Model.measurements[name]))
            return retval
        else:
            return self.format(self.vehicle.get(Model.measurements[name]))

"""
def onWindshieldWiperStatus(status):
  print status

v.listen(measurements.WindshieldWiperStatus,onWindshieldWiperStatus)
"""