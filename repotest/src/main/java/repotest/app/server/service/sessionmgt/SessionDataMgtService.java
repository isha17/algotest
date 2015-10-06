package repotest.app.server.service.sessionmgt;
import java.sql.Timestamp;

public interface SessionDataMgtService {
	// public void setSessionAttribute(String key,Object value);

	public void setSessionAttributeForNumber(String key, Number value);

	public void setSessionAttributeForString(String key, String value);

	public void setSessionAttributeForBoolean(String key, Boolean value);

	public void setSessionAttributeForDateTime(String key, Timestamp value);

	public void setSessionAttributeForObject(String key, Object value);

	public void removeSessionAttribute(String key);

	public void removeSessionAllAttributes();

	public Object getSessionData(String key);

	public <T> Object getSessionDataForObject(String key, Class clazz);
}
