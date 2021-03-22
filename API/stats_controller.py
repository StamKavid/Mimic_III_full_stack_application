from flask import Flask, Blueprint, jsonify
import stats_service

api = Blueprint(
    name="stats_controller",
    import_name="stats_controller",
    url_prefix="/Mimic/stats",
)


@api.route("/")
def stats():
    return jsonify(stats_service.main()), 200