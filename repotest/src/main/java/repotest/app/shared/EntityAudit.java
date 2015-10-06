package repotest.app.shared;
import java.io.Serializable;
import javax.persistence.Embeddable;
import javax.persistence.Column;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.sql.Date;

@Embeddable
public class EntityAudit implements Serializable {

    @Column(name = "createdBy", updatable = false)
    @Size(min = 0, max = 64)
    @JsonProperty("createdBy")
    private String createdBy;

    @Column(name = "createdDate", updatable = false)
    @JsonProperty("createdDate")
    private Date createdDate;

    @Column(name = "updatedBy")
    @Size(min = 0, max = 64)
    @JsonProperty("updatedBy")
    private String updatedBy;

    @Column(name = "updatedDate")
    @JsonProperty("updatedDate")
    private Date updatedDate;

    public EntityAudit() {
        createdDate = new java.sql.Date(System.currentTimeMillis());
        updatedDate = new java.sql.Date(System.currentTimeMillis());
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String _createdBy) {
        this.createdBy = _createdBy;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String _updatedBy) {
        this.updatedBy = _updatedBy;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }
}
